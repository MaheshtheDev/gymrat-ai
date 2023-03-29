import React from 'react'
import { Text, TextProps } from 'react-native'
import styles from './style'

interface LabelProps extends TextProps {
  label: any
  varient?: string
}
export enum TextVarient {
  description = 'description',
  greenbutton = 'greenbutton',
  whitebutton = 'whitebutton',
  black = 'black',
  cancel = 'cancel',
  save = 'save',
  title = 'title',
  signuptitle = 'signuptitle',
  signupbutton='signupbutton'
}

export const LabelComponent: React.FC<LabelProps> = ({ label, varient, ...props }) => {
  const TextStyle = () => {
    switch (varient) {
      case TextVarient.greenbutton:
        return styles.greenbutton
        case TextVarient.signupbutton:
          return styles.signupbutton
      case TextVarient.whitebutton:
        return styles.whitebutton
      case TextVarient.description:
        return styles.description
      case TextVarient.title:
        return styles.title
      case TextVarient.black:
        return styles.black
      case TextVarient.cancel:
        return styles.cancel
      case TextVarient.save:
        return styles.save
      case TextVarient.signuptitle:
        return styles.signuptitle
      default:
        return
    }
  }
  return (
    <Text style={TextStyle()} {...props}>
      {label}
    </Text>
  )
}
