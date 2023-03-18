import { OnboardingStackParamList } from '@navigation'
import { ROUTES } from '@constants'
import React from 'react'
import { WelcomeScreen } from '@containers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<OnboardingStackParamList>()
export type OnboardingStackProps = {}
export const OnboardingStack: React.FC<OnboardingStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={ROUTES.WELCOME_SCREEN}
        component={WelcomeScreen}
        // options={headerOptionsWithoutBack}
      />
    </Stack.Navigator>
  )
}
