import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native'
import styles from './style'
import { LabelComponent } from '@components/Label'
import Google from '../../assets/svg/google.svg'
import Apple from '../../assets/svg/apple.svg'

interface ButtonComponentProps extends TouchableOpacityProps {
  label: string
  varient: string
  labelVarient: string
  GoogleIcon?: boolean
  AppleIcon?: boolean
}

export enum ButtonVarient {
  green = 'green',
  withBorder = 'withBorder',
  lightgreen = 'lightgreen',
  savebutton = 'savebutton',
  cancelbutton = 'cancelbutton',
  continue='continue'
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  labelVarient,
  varient,
  GoogleIcon = false,
  AppleIcon = false,
  ...props
}) => {
  const buttonStyles = () => {
    switch (varient) {
      case ButtonVarient.green:
        return styles.green

      case ButtonVarient.lightgreen:
        return styles.lightgreen
      case ButtonVarient.continue:
        return styles.continue

      case ButtonVarient.withBorder:
        return styles.withBorder

      case ButtonVarient.cancelbutton:
        return styles.cancelbutton

      case ButtonVarient.savebutton:
        return styles.savebutton
      default:
        return
    }
  }

  return (
    <TouchableOpacity style={buttonStyles()} {...props}>
      {GoogleIcon && (
        <View style={styles.iconconatiner}>
          <Google height={25} width={25} />
        </View>
      )}
      {AppleIcon && (
        <View style={styles.iconconatiner}>
          <Apple height={25} width={25} />
        </View>
      )}
      <View>
        <LabelComponent label={label} varient={labelVarient} />
      </View>
    </TouchableOpacity>
  )
}
