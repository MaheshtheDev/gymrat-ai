import { StyleSheet } from 'react-native'
import {
  FONT_SIZE_12,
  FONT_SIZE_26,
  FONT_WEIGHT_OR_TEXT,
  MONTSERRAT_REGULAR,
} from '@styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '@styles/colors'

export const styles = StyleSheet.create({
  coinatiner: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  title: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_26,
    fontFamily: MONTSERRAT_REGULAR,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    marginHorizontal: wp('8%'),
  },
  subtitle: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('8%'),
    opacity: 0.5,
    marginVertical: hp('1.2%'),
  },
  buttoncontainer: {
    marginVertical: hp('3%'),
  },
})
