import { StyleSheet } from 'react-native'
import {
  MONTSERRAT_BOLD,
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
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  title: {
    fontSize: FONT_SIZE_26,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('7.75%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  subtitle: {
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('7.75%'),
    opacity: 0.5,
    marginVertical: hp('1.2%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  buttoncontainer: {
    marginTop: hp('3%'),
  },
})
