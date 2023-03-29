import React from 'react'
import {  TouchableOpacity, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'
import Colors from '@styles/colors'
import { Octicons } from '@expo/vector-icons'
import { LabelComponent, TextVarient } from '@components/Label'

interface HeaderProps {
  showLoginButton?: boolean
  showSignUpButton?: boolean
  onLoginPress?: () => void
  onBackPress?: () => void
  Lebel?: boolean
  editICon?: boolean
  onIconPress?: () => void
}

export const Header = ({
  showLoginButton = false,
  showSignUpButton = false,
  editICon = false,
  onLoginPress,
  onBackPress,
  onIconPress,
  Lebel=false,
}: HeaderProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name='arrow-back' size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      )}
      {Lebel && (
        <LabelComponent
          label='Profile'
          varient={TextVarient.title}
          style={[styles.labeltitle,!editICon && styles.passs]}
        />
      )}
      {editICon && (
        <TouchableOpacity style={styles.editicon} onPress={onIconPress}>
          <Octicons name='pencil' size={20} color={Colors.WHITE} />
        </TouchableOpacity>
      )}
      {showLoginButton && (
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <LabelComponent label='Login' style={styles.logintxt} />
        </TouchableOpacity>
      )}

      {showSignUpButton && (
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <LabelComponent label='Sign Up' style={styles.logintxt} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}
