import React, { useContext, useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { View } from 'react-native'
import { styles } from './style'

export const SignUpOptionsScreen: React.FC<AuthStackNavProps<'SignUpOptionsScreen'>> = ({
  navigation,
  route,
}) => {
  return <View style={styles.parentContainer}></View>
}
