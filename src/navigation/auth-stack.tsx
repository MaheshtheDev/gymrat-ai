import * as React from 'react'

import { ROUTES, Strings } from '@constants'

import { AuthStackParamList } from './stack-param-list'
import { SignUpOptionsScreen } from '@containers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.SIGN_UP_OPTIONS_SCREEN}
        component={SignUpOptionsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name={ROUTES.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              isBackButtonVisible={true}
              onBackButtonPress={() => globalNavigateBack(false)}
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  )
}
