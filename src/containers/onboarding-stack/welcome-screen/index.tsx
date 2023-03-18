import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { OnboardingStackNavProps } from '@navigation'
import { styles } from './style'

export const WelcomeScreen: React.FC<OnboardingStackNavProps<'WelcomeScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <View style={styles.parentContainer}>
      <Text>Welcome </Text>
    </View>
  )
}
