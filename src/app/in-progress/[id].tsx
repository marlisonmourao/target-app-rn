import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Alert, View } from 'react-native'

import { Button } from '@/components/button'
import { List } from '@/components/list'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction } from '@/components/transaction'

import { TransactionType } from '@/utils/transaction-types'
import { TargetResponse, useTargetDb } from '@/database/use-target-db'
import { useCallback, useState } from 'react'
import { numberToCurrency } from '@/utils/number-to-currency'
import { Loading } from '@/components/loading'

const transactions = [
  {
    id: '1',
    value: 'R$ 100,00',
    date: '2025-01-01',
    description: 'Compra de Apple Watch',
    type: TransactionType.Input
  },
  {
    id: '2',
    value: 'R$ 100,00',
    date: '2025-01-01',
    description: 'Compra de Apple Watch',
    type: TransactionType.Output
  }
]

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  const targetDb = useTargetDb()

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

    await Promise.all([fetchDetailsPromise])

    setIsFetching(false)
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader 
        title={details.name} 
        rightButton={{
          icon: 'edit',
          onPress: () => {}
        }}
      />

      <Progress 
        data={details}
      />

      <List 
        title='Transações'
        data={transactions}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => {}} />}
        emptyMessage='Nenhuma transação. Toque em nova transação para começar a economizar'
      />

      <Button 
        title='Nova transação' 
        onPress={() => router.navigate(`/transaction/${params.id}`)} 
      />

    </View>
  )
}