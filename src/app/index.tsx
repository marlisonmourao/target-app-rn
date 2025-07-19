import { Button } from '@/components/button'
import { HomeHeader } from '@/components/home-header'
import { List } from '@/components/list'
import { Loading } from '@/components/loading'
import { Target, TargetProps } from '@/components/target'
import { TargetResponse, useTargetDb } from '@/database/use-target-db'
import { numberToCurrency } from '@/utils/number-to-currency'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, StatusBar, View } from 'react-native'

export default function Index() {
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const targetDb = useTargetDb()

  const summary = {
    total: 'R$ 100,00',
    input: { label: 'Entradas', value: 'R$ 6.700,00' },
    output: { label: 'Saídas', value: 'R$ 2.700,00' }
  }

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      setIsFetching(true)
      const response = await targetDb.listBySavedValue()

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

  async function fetchData() {
    const targetDataPromise = fetchTargets()

    const [ targetData ] = await Promise.all([targetDataPromise])

    setTargets(targetData)
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