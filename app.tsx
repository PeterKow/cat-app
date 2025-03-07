import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/main'
import UploadScreen from './screens/upload-screen'
import {PaperProvider} from 'react-native-paper'
import {darkTheme, lightTheme} from '@components/theme'
import {useColorScheme} from 'react-native'
import Toast from 'react-native-toast-message'
import {QueryClient, QueryClientProvider} from 'react-query'

export type RootStackParamList = {
  Home: undefined
  Upload: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme   : lightTheme
  const queryClient = new QueryClient()

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Upload" component={UploadScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </QueryClientProvider>
    </PaperProvider>
  )
}
