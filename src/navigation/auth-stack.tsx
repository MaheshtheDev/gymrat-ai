import * as React from 'react'

import { AuthStackParamList } from './stack-param-list'
import { SignUpOptionsScreen, AddMoreDetailsScreen } from '../containers'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {
  onPress?: () => void
  navigation: NativeStackNavigationProp<AuthStackParamList>
}

export const AuthStack: React.FC<AuthStackProps> = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='SignUpOptionsScreen'>
      <Stack.Screen
        name={'SignUpOptionsScreen'}
        component={SignUpOptionsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={'AddMoreDetailsScreen'}
        component={AddMoreDetailsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}