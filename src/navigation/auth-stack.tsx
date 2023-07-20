import * as React from 'react'

import { AuthStackParamList } from './stack-param-list'
import {
  SignUpOptionsScreen,
  SignUpOtpScreen,
  SignUpScreen,
  SignUpConfirmScreen,
  SignInScreen,
  AddMoreDetailsScreen,
  WelcomeScreen,
} from '../containers'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { Header } from '../components'
import { NavigationService } from './NavigationService'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {
  onPress?: () => void
  navigation: NativeStackNavigationProp<AuthStackParamList>
}

export const AuthStack: React.FC<AuthStackProps> = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='SignUpOptionsScreen'>
      <Stack.Screen
        name={'WelcomeScreen'}
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={'SignUpOptionsScreen'}
        component={SignUpOptionsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/*<Stack.Screen
        name={'SignUpScreen'}
        component={SignUpScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={true}
              onLoginPress={() =>
                navigation.navigate('AuthStack', { screen: 'SignInScreen' })
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name={'SignUpOtpScreen'}
        component={SignUpOtpScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name={'SignUpConfirmScreen'}
        component={SignUpConfirmScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />*/}
      {/*<Stack.Screen
        name={'SignInScreen'}
        component={SignInScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={false}
              showSignUpButton={true}
              onSignUpPress={() =>
                navigation.navigate('AuthStack', { screen: 'SignUpScreen' })
              }
            />
          ),
        }}
      />*/}
      <Stack.Screen
        name={'AddMoreDetailsScreen'}
        component={AddMoreDetailsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

const headerStyle = {
  backgroundColor: 'white',
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  height: 60,
}
