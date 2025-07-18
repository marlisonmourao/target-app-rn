import { colors } from '@/theme'
import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle
} from 'react-native'
import { Separator } from '../separator'
import { styles } from './styles'

type Props<T> = FlatListProps<T> & {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function List<T>({ 
  title, 
  emptyMessage, 
  containerStyle, 
  data, 
  renderItem, 
  ListEmptyComponent,
  ...rest }: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        {...rest}
      />
    </View>
  )
}