import React from 'react'
import { useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { darkTheme, lightTheme } from '@components/theme'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'
// import {SafeAreaView} from 'react-native-safe-area-context'

export default function RootLayout() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const queryClient = new QueryClient()

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/*<SafeAreaView style={{ flex: 1 }}>*/}
          <Slot />
        {/*</SafeAreaView>*/}
        <Toast />
      </QueryClientProvider>
    </PaperProvider>
  )
}
