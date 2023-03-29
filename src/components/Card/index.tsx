import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import styles from './style'

interface Props {
  //   title: string
  //   subtitle: string
  //   content: string
  cardStyle?: ViewStyle,
  children: React.ReactNode
}

export const CardComponent: React.FC<Props> = ({ children, cardStyle }) => {
  return <View style={[styles.container, cardStyle]}>{children}</View>
}

// export default CardComponent
