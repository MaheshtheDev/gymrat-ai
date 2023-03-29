import React from 'react'

import { AuthStackNavProps } from '@navigation'
import {  View, SafeAreaView, ScrollView } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
  
} from '@components'
import {  ROUTES, Strings } from '@constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const SignUpScreen: React.FC<AuthStackNavProps<'SignUpScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.coinatiner}>
      <ScrollView>
        <LabelComponent label={Strings.SET_UP_PROFILE} style={styles.title} />
        <LabelComponent
          label={Strings.PROFILE_DESCRIPTION}
          style={styles.subtitle}
        />
        <KeyboardAwareScrollView>
        <View>
          <TextInputComponent placeholder={Strings.FRIST_NAME} />
          <TextInputComponent placeholder={Strings.LAST_NAME} />
          <TextInputComponent placeholder={Strings.EMAIL} />
          <TextInputComponent placeholder={Strings.PASSWORD} />
          <TextInputComponent placeholder={Strings.CONFIRM_PASSWORD} />
        </View>
        <View style={styles.buttoncontainer}>
          <ButtonComponent
            onPress={() =>
              navigation.push(ROUTES.AUTH_STACK, {
                screen: ROUTES.SIGN_UP_OTP_SCREEN,
              })
            }
            varient={ButtonVarient.lightgreen}
            label={Strings.CONTINUE}
            labelVarient={TextVarient.black}
          />
        </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
