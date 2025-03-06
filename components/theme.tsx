import {DefaultTheme} from 'react-native-paper'

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    accent: '#ff9800'
  }
}

export const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    accent: '#ff9800',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff'
  }
}
