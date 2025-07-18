import { Suspense } from 'react'

import { colors } from '@/theme/colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

import { Loading } from '@/components/loading'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter'

import { migrate } from '@/database/migrate'
import { SQLiteProvider } from 'expo-sqlite'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.white} 
        translucent={false}
      />
      <SQLiteProvider 
        databaseName='target.db' 
        onInit={migrate} 
        useSuspense
        >
        <Stack  
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white }
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'Home',
            }} 
          />
          <Stack.Screen 
            name="target" 
            options={{ 
              title: 'Target',
            }} 
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  )
} 