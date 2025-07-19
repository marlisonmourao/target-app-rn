import { Button } from '@/components/button'
import { CurrencyInput } from '@/components/currency-input'
import { Input } from '@/components/input'
import { PageHeader } from '@/components/page-header'
import { TransactionType } from '@/utils/transaction-types'
import { useTransactionsDb } from '@/database/use-transactions-db'
import { TransactionTypes as TransactionTypeComponent } from '@/components/transaction-type'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, View } from 'react-native'

export default function Transaction() {
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState(TransactionType.Input)
  const [isCreating, setIsCreating] = useState(false)
  const [observation, setObservation] = useState('')

  const params = useLocalSearchParams<{ id: string }>()
  const transactionsDatabase = useTransactionsDb()

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert(
          'Atenção!',
          'Preencha o valor. A transação deve ser maior que zero.',
        )
      }

      setIsCreating(true)

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionType.Output ? amount * -1 : amount,
        observation,
      })

      Alert.alert('Sucesso', 'Transação foi salva com sucesso!', [
        {
          text: 'Ok',
          onPress: router.back,
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação')
      console.log(error)
      setIsCreating(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionTypeComponent selected={type} onChance={setType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Input
          label="Motivo"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  )
}