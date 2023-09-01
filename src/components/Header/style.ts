import {
  MONTSERRAT_BOLD,
  FONT_SIZE_20,
  FONT_WEIGHT_OR_TEXT,
  FONT_WEIGHT_TITLE,
  MONTSERRAT_REGULAR,
} from '@styles'
import Colors from '@styles/colors'
import {  StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLACK,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: hp('2%'),
    marginHorizontal: wp('0.5%'),
  },
  editicon: {
    padding: hp('2%'),
    marginHorizontal: wp('3%'),
  },
  logintxt: {
    color: Colors.WHITE,
    marginVertical: hp('0.2%'),
    marginHorizontal: wp('3.5%'),
    fontFamily:MONTSERRAT_REGULAR
  },
  loginButton: {
    padding: wp('1%'),
    backgroundColor: Colors.BLACK,
    borderColor: Colors.YELLOW,
    borderRadius: 22,
    borderWidth: 1,
    marginRight: wp('4%'),
  },
  loginButtonText: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
  },
  labeltitle: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_TITLE,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: MONTSERRAT_BOLD,
    flex:1,
  },
  passs:{
    marginRight:wp('15%'),
  }
})

export default styles
