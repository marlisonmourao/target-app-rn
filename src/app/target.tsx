import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { Alert, StatusBar, View } from "react-native"

import { router, useLocalSearchParams } from 'expo-router'

import { CurrencyInput } from '@/components/currency-input'
import { useState } from 'react'
import { useTargetDb } from '@/database/use-target-db'

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const targetDb = useTargetDb()

  const params = useLocalSearchParams<{id?: string}>()

  function handleSave() {
    if(!name.trim() || amount <= 0) {
      return Alert.alert('Erro', 'Preencha todos os campos')
    }

    setIsProcessing(true)

    if(params.id) {
      handleUpdate()
    } else {
      handleCreate()
    }

  }

  async function handleCreate() {
    try {
      await targetDb.create({
        name,
        amount
      })

      Alert.alert('Nova meta', 'Meta criada com sucesso', 
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      )
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro ao criar meta')
    } finally {
      setIsProcessing(false)
    }
  }

  async function handleUpdate() {

  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle='dark-content' />
      
      <PageHeader 
        title="Meta" 
        subtitle="Crie uma nova meta para alcançar seus objetivos" 
      />

      <View style={{ gap: 24, marginTop: 32 }}>
        <Input  
          label="Nome da meta"
          placeholder="Ex: Viajar para a praia"
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label="Valor alvo"
          placeholder="Ex: 1000,00"
          value={amount}
          onChangeValue={value => setAmount(value ?? 0)}
        />

        <Button 
          title='Salvar' 
          onPress={handleSave} 
          isProcessing={isProcessing} 
          disabled={isProcessing}
        />
      </View>

    </View>
  )
}