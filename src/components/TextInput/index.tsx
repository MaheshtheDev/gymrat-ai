import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styles from './style'
import Colors from '@styles/colors'

interface TextInputcomponentProps extends TextInputProps {
  placeholder: string
}

export const TextInputComponent: React.FC<TextInputcomponentProps> = ({
  placeholder,
  ...props
}) => {


  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={Colors.HARLEQUIN}
      style={styles.textInput}
      keyboardAppearance='dark'
      {...props}
    />

  )
}