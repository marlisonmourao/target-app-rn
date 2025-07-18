import { ActivityIndicator, View } from 'react-native'

import { colors } from '@/theme/colors'
import { styles } from './styles'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.blue[500]} style={styles.container} />
    </View>
  )
}