import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import styles from './style'

interface Props {
 
  cardStyle?: ViewStyle,
  children: React.ReactNode
}

export const CardComponent: React.FC<Props> = ({ children, cardStyle }) => {
  return <View style={[styles.container, cardStyle]}>{children}</View>
}
