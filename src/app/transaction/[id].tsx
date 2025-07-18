import { useLocalSearchParams } from 'expo-router'
import { StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { TransactionTypes } from '@/components/transaction-type'
import { TransactionType } from '@/utils/transaction-types'
import { useState } from 'react'



export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>()

  const [type, setType] = useState<TransactionType>(TransactionType.Input)

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle='dark-content' />

      <PageHeader 
        title="Nova transação" 
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar gastar." 
      />


      <View style={{marginTop: 32, gap: 24}}>
        <TransactionTypes 
          selected={type} 
          onChance={setType} 
        />

        <CurrencyInput label="Valor (R$)" value={0} />

        <Input 
          label="Motivo (Opcional)" 
          placeholder="Ex: Compra de Apple Watch" 
          multiline
        />

        <Button title="Salvar" />
      </View>


    </View>
  )
}