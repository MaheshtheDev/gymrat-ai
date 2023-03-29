import { StyleSheet } from 'react-native'
import { Typography } from '@styles'
import Colors from '@styles/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titlecontainer: {
    marginTop: wp('5%'),
  },
  descriptioncontainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    marginBottom: hp('5%'),
    marginLeft:wp('1.5%')
  },
})
