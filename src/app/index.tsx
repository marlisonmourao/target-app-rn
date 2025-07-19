import { Button } from '@/components/button'
import { HomeHeader, HomeHeaderProps } from '@/components/home-header'
import { List } from '@/components/list'
import { Loading } from '@/components/loading'
import { Target, TargetProps } from '@/components/target'
import { useTargetDb } from '@/database/use-target-db'
import {  useTransactionsDb } from '@/database/use-transactions-db'
import { numberToCurrency } from '@/utils/number-to-currency'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, StatusBar, View } from 'react-native'

export default function Index() {
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [summary, setSummary] = useState<HomeHeaderProps>({} as HomeHeaderProps)

  const targetDb = useTargetDb()
  const transactionsDb = useTransactionsDb()

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      setIsFetching(true)
      const response = await targetDb.listByPercentageValue()

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurrency(item.amount),
      }))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.')
      console.log(error)
      return []
    } finally {
      setIsFetching(false)
    }
  }

  async function fetchSummary() {
    try {
      const response = await transactionsDb.summary()

      if (!response) {
        return {} as HomeHeaderProps
      }

      return {
        total: numberToCurrency(response.input - response.output),
        input: {
          label: 'Entradas',
          value: numberToCurrency(response.input)
        },
        output: {
          label: 'Saídas',
          value: numberToCurrency(response.output)
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.')
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets()
    const summaryPromise = fetchSummary()

    const [ targetData, summary ] = await Promise.all([targetDataPromise, summaryPromise])

    setTargets(targetData)
    setSummary(summary ?? {} as HomeHeaderProps)
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <HomeHeader data={summary} />

      <List
        title="Metas"
        keyExtractor={(item) => item.id?.toString() ?? ''}
        data={targets}
        renderItem={({ item }) => {
          return (
            <Target
              data={item}
              onPress={() => router.navigate(`/in-progress/${item.id}`)}
            />
          )
        }}
        emptyMessage="Nenhuma meta encontrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 22 }}>
        <Button title="Nova meta" onPress={() => router.push('/target')} />
      </View>
    </View>
  )
}