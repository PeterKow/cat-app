import React from 'react'
import { Card as CardPaper } from 'react-native-paper'
import {StyleProp, StyleSheet, ViewStyle} from 'react-native'

interface CustomCardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}


export default function Card({ children, style }: CustomCardProps) {
  return (
    <CardPaper style={[defaultStyles.card, style]}>
      {children}
    </CardPaper>
  )
}

const defaultStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 12,
    padding: 10,
  },
})
