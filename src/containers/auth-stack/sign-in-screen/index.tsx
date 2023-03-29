import React from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, View } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { ROUTES, Strings } from '@constants'

export const SignInScreen: React.FC<AuthStackNavProps<'SignInScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LabelComponent style={styles.title} label={Strings.SIGN_IN_TITLE} />
      <View>
        <LabelComponent
          label={Strings.SIGN_IN_DESCRIPTION_TEXT}
          style={styles.subtitle}
        />
        <View>
          <TextInputComponent placeholder={Strings.EMAIL} />
          <TextInputComponent placeholder={Strings.PASSWORD} />
        </View>
        <View style={styles.buttoncontainer}>
          <ButtonComponent
            label={Strings.LOGIN}
            varient={ButtonVarient.lightgreen}
            labelVarient={TextVarient.black}
            onPress={() =>
              navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.HOME_SCREEN })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
