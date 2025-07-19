import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Alert, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { List } from '@/components/list'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction, TransactionProps } from '@/components/transaction'

import dayjs from 'dayjs'

import { TransactionType } from '@/utils/transaction-types'
import { useTargetDb } from '@/database/use-target-db'
import { useCallback, useState } from 'react'
import { numberToCurrency } from '@/utils/number-to-currency'
import { Loading } from '@/components/loading'
import { useTransactionsDb } from '@/database/use-transactions-db'

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  const targetDb = useTargetDb()
  const transactionsDb = useTransactionsDb()

  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  })

  async function fetchDetails() {
    try {
      setIsFetching(true)
      const response = await targetDb.show(Number(params.id))

      if (!response) {
        return
      }

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage
      })

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.')
      console.log(error)
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails()
    const fetchTransactionsPromise = fetchTransactions()

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise])

    setIsFetching(false)
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDb.listByTargetId(Number(params.id))

      const transactionsFormatted = response.map(transaction => ({
        id: transaction.id.toString(),
        value: numberToCurrency(transaction.amount),
        date: dayjs(transaction.createdAt).format('DD/MM/YYYY HH:mm'),
        description: transaction.observation ?? 'Sem descrição',
        type: transaction.amount > 0 ? TransactionType.Input : TransactionType.Output,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt
      }))

      setTransactions(transactionsFormatted)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar as transações')
    }
  }

  function handleTransactionRemove(id: string) {
    try {
      
      Alert.alert('Remover transação', 'Tem certeza que deseja remover a transação?', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            transactionsDb.remove(Number(id))
            fetchData()
            Alert.alert('Sucesso', 'Transação removida com sucesso')
          }
        }
      ])

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a transação')
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      
      <PageHeader 
        title={details.name} 
        rightButton={{
          icon: 'edit',
          onPress: () => router.navigate(`/target?id=${params.id}`)
        }}
      />

      <Progress 
        data={details}
      />

      <List 
        title='Transações'
        data={transactions}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => handleTransactionRemove(item.id)} />}
        emptyMessage='Nenhuma transação. Toque em nova transação para começar a economizar'
      />

      <Button 
        title='Nova transação' 
        onPress={() => router.navigate(`/transaction/${params.id}`)} 
      />

    </View>
  )
}