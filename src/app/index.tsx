import { Button } from '@/components/button'
import { HomeHeader } from '@/components/home-header'
import { List } from '@/components/list'
import { Target } from '@/components/target'
import { router } from 'expo-router'
import { StatusBar, View } from 'react-native'

const summary = {
  total: 'R$ 100,00',
  input: { label: 'Entradas', value: 'R$ 6.700,00' },
  output: { label: 'Saídas', value: 'R$ 2.700,00' }
}

const targets = [
  {
    id: '1',
    name: "Comprar cadeira ergonômica",
    percentage: "75%",
    current: "R$ 750,00",
    target: "R$ 1.000,00"
  },
  {
    id: '2',
    name: "Comprar notebook",
    percentage: "50%",
    current: "R$ 500,00",
    target: "R$ 1.000,00"
  },
  {
    id: '3',
    name: "Comprar celular",
    percentage: "25%",
    current: "R$ 250,00",
    target: "R$ 1.000,00"
  }
]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <HomeHeader data={summary} />

      <List
        title="Metas"
        keyExtractor={(item) => item.id}
        data={targets}
        renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
        emptyMessage="Nenhuma meta encontrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 22 }}>
        <Button title="Nova meta" onPress={() => router.push('/target')} />
      </View>
    </View>
  )
}