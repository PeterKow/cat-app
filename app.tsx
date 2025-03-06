import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/main'
import UploadScreen from './screens/upload-screen'
import {PaperProvider} from 'react-native-paper'
import {darkTheme, lightTheme} from '@components/theme'
import {useColorScheme} from 'react-native'

export type RootStackParamList = {
  Home: undefined
  Upload: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme   : lightTheme

  return (<PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
