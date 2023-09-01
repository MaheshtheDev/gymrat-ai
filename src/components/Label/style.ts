import {
  FONT_SIZE_13,
  FONT_SIZE_16,
  FONT_SIZE_20,
  FONT_SIZE_40,
  FONT_WEIGHT_600,
  FONT_WEIGHT_700,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_DESCRIPTION,
  FONT_WEIGHT_TITLE,
  MONTSERRAT,
  MONTSERRAT_BLACK,
  MONTSERRAT_BOLD,
  MONTSERRAT_EXTRA_BOLD,
  MONTSERRAT_EXTRA_BOLD_ITALIC,
  SF_PRO,
  SF_PRO_SEMI_BOLD,
} from '@styles'
import Colors from '@styles/colors'
import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  greenbutton: {
    color: Colors.BLACK,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_700,
    textAlign: 'center',
    fontFamily: MONTSERRAT_BOLD,
    marginVertical: hp('2%'),
  },
  signupbutton: {
    color: Colors.BLACK,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_600,
    textAlign: 'center',
    fontFamily: MONTSERRAT_BOLD,
    marginVertical: hp('2%'),
  },
  whitebutton: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_600,
    textAlign: 'center',
    fontFamily: MONTSERRAT,
    marginVertical: hp('2%'),
  },
  description: {
    flexWrap: 'wrap',
    lineHeight: 46,
    color: Colors.WHITE,
    fontSize: FONT_SIZE_40,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: SF_PRO,
    marginHorizontal: wp('6%'),
  },
  title: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_TITLE,
    fontFamily: MONTSERRAT_EXTRA_BOLD,
    display: 'flex',

    alignSelf: 'center',
  },
  signuptitle: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_700,
    fontFamily: MONTSERRAT_EXTRA_BOLD,
    display: 'flex',
    alignSelf: 'center',
  },
  black: {
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_600,
    fontFamily: MONTSERRAT_BOLD,
    textAlign: 'center',
    paddingVertical: wp('2%'),
  },
  save: {
    fontSize: FONT_SIZE_13,
    color: Colors.BLACK,
    fontWeight: FONT_WEIGHT_TITLE,
    fontFamily: MONTSERRAT,
    textAlign: 'center',
  },
  cancel: {
    fontSize: FONT_SIZE_13,
    fontWeight: FONT_WEIGHT_TITLE,
    fontFamily: MONTSERRAT,
    textAlign: 'center',
    color: Colors.WHITE,
  },
  logout: {
    fontSize: FONT_SIZE_13,
    fontWeight: FONT_WEIGHT_700,
    fontFamily: MONTSERRAT,
    textAlign: 'center',
    color: Colors.WHITE,
  },
})

export default styles
