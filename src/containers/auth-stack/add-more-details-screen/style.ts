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
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titlecontainer: {
    marginTop: hp('5%'),
  },
  title: {
    fontSize: FONT_SIZE_26,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginLeft: wp('8%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  subtitle: {
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('9%'),
    opacity: 0.5,
    marginVertical: hp('1.2%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  label: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: hp('3%'),
    marginHorizontal: wp('9%'),
  },
  txtinput: {
    backgroundColor: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.BORDERGREEN,
    marginLeft: wp('5.7%'),
    marginRight: wp('5%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    opacity: 0.5,
    marginTop: hp('1%'),
    color: Colors.WHITE,
  },
  buttoncontainer: {
    marginTop: hp('5%'),
  },
})
