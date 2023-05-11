import * as React from 'react'

import { ROUTES, Strings } from '@constants'

import { AuthStackParamList, HomeStackParamList } from './stack-param-list'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Header, ProfileHeader } from '@components'
import { NavigationService, navigationRef } from './NavigationService'
import { HomeScreen, MealScreen, ProfileScreen, Workoutscreen } from '@containers'

const Stack = createNativeStackNavigator<HomeStackParamList>()
type HomeStackProps = {
  onPress?: () => void
}

export const HomeStack: React.FC<HomeStackProps> = ({ navigation, onPress }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={ROUTES.WORKOUT_DETAILS}
        component={Workoutscreen}
        options={{
          header: () => <Header onBackPress={() => NavigationService.goBack()} />,
        }}
      />
      <Stack.Screen
        name={ROUTES.MEAL_DETAILS}
        component={MealScreen}
        options={{
          header: () => <Header onBackPress={() => NavigationService.goBack()} />,
        }}
      />
    </Stack.Navigator>
  )
}
