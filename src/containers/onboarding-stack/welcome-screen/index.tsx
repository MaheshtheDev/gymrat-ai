import React from 'react'
import { View, SafeAreaView } from 'react-native'

import { AuthStackNavProps } from '@navigation'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  ImageBackgroundComponent,
  LabelComponent,
  TextVarient,
} from '@components'
import { Images, ROUTES, Strings } from '@constants'

export const WelcomeScreen: React.FC<AuthStackNavProps<'WelcomeScreen'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlecontainer}>
        <LabelComponent label={Strings.WELCOME_TEXT} varient={TextVarient.title} />
      </View>
      <ImageBackgroundComponent src={Images.welcomeImage} resizeMode={'contain'}>
        <View style={styles.descriptioncontainer}>
          <LabelComponent
            numberOfLines={0}
            label={Strings.WELCOME_DESCRIPTION_TEXT}
            varient={TextVarient.description}
          />
        </View>
      </ImageBackgroundComponent>
      <ButtonComponent
        onPress={() =>
          navigation.navigate('AuthStack', {
            screen: 'SignUpOptionsScreen',
          })
        }
        label={Strings.LETS_GO}
        varient={ButtonVarient.green}
        labelVarient={TextVarient.greenbutton}
      />
    </SafeAreaView>
  )
}
