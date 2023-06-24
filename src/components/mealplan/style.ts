import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import {
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_9,
  FONT_WEIGHT_OR_TEXT,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '@styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'
const styles = StyleSheet.create({
  mealview: {
    marginVertical: hp('1%'),
  },
  mealconatiner: {
    flexDirection: 'row',
  },
  heading: {
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontSize: FONT_SIZE_12,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.SPRING_GREEN,
    opacity: 0.4,
    marginBottom: hp('0.3%'),
    marginTop: hp('0.5%'),
  },
  headingmd: {
    fontSize: FONT_SIZE_9,
    fontFamily: MONTSERRAT_BOLD,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    marginTop: hp('0.55%'),
    color: Colors.WHITE,
    marginHorizontal: wp('0.2%'),
  },
  subheading: {
    fontSize: FONT_SIZE_14,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.WHITE,
    marginBottom: hp('0.4%'),
  },
})

export default styles
