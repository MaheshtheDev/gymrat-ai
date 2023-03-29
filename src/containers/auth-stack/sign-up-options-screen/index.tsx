import React from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView,View } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  ImageBackgroundComponent,
  LabelComponent,
  TextVarient,
} from '@components'
import { Images, ROUTES, Strings } from '@constants'


export const SignUpOptionsScreen: React.FC<AuthStackNavProps<'SignUpOptionsScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.titlecontainer}>
        <LabelComponent label={Strings.WELCOME_TEXT} varient={TextVarient.signuptitle} />
      </View>
      <ImageBackgroundComponent src={Images.welcomeImage} resizeMode='contain'>
        <View style={styles.buttoncontainer}>
          <View style={styles.loginbtncontainer}>
            <ButtonComponent
              onPress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_UP_SCREEN })
              }
              varient={ButtonVarient.green}
              label={Strings.SIGN_UP}
              labelVarient={TextVarient.signupbutton}
            />
          </View>
          <View>
            <ButtonComponent onPress={()=>navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_IN_SCREEN }) }
              varient={ButtonVarient.withBorder}
              label={Strings.LOGIN}
              labelVarient={TextVarient.whitebutton}
            />
          </View>
          <View style={styles.ortxt}>
            <LabelComponent
              label={Strings.OR}
              varient={TextVarient.title}
              style={styles.orlabeltxt}
            />
          </View>
          <View style={styles.googlebtncoinatiner}>
            <ButtonComponent
              varient={ButtonVarient.withBorder}
              label={Strings.GOOGLE_BUTTON_TEXT}
              labelVarient={TextVarient.whitebutton}
              GoogleIcon={true}
            />
          </View>
          <View>
            <ButtonComponent
              varient={ButtonVarient.withBorder}
              label={Strings.GOOGLE_BUTTON_TEXT}
              labelVarient={TextVarient.whitebutton}
              AppleIcon={true}
            />
          </View>
        </View>
      </ImageBackgroundComponent>
    </SafeAreaView>
  )
}
