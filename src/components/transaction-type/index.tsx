import { View } from 'react-native'

import { colors } from '@/theme'
import { TransactionType } from '@/utils/transaction-types'
import { Option } from './option'
import { styles } from './styles'

type Props = {
  selected: TransactionType
  onChance: (type: TransactionType) => void
}

export function TransactionTypes({ selected, onChance }: Props) {
  return (
    <View style={styles.container}>
      <Option 
        title="Guardar" 
        icon="arrow-upward" 
        isSelected={selected === TransactionType.Input} 
        selectedColor={colors.blue[500]} 
        onPress={() => onChance(TransactionType.Input)}
      />

      <Option 
        title="Resgatar" 
        icon="arrow-downward" 
        isSelected={selected === TransactionType.Output} 
        selectedColor={colors.red[400]} 
        onPress={() => onChance(TransactionType.Output)}
      />
    </View>
  )
}