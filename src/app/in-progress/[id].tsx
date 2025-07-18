import { router, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

import { Button } from '@/components/button'
import { List } from '@/components/list'
import { PageHeader } from '@/components/page-header'
import { Progress } from '@/components/progress'
import { Transaction } from '@/components/transaction'

import { TransactionType } from '@/utils/transaction-types'

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

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader 
        title="Apple Watch" 
        rightButton={{
          icon: 'edit',
          onPress: () => {}
        }}
      />

      <Progress 
        data={{
          current: 'R$ 100,00',
          target: 'R$ 1000,00',
          percentage: 50
        }}
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