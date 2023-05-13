import { MONTSERRAT_BOLD, FONT_WEIGHT_600 } from '@styles'
import Colors from '@styles/colors'
import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  green: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    marginHorizontal: wp('6.25%'),
    borderRadius: 50,
  },
  withBorder: {
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    marginHorizontal: wp('5.4%'),
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  lightgreen: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    marginHorizontal: wp('5.4%'),
    borderRadius: 50,
    opacity: 0.5,
  },
  continue: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    marginHorizontal: wp('5.4%'),
    borderRadius: 50,
  },
  imageButtonContainer: {
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    marginHorizontal: wp('5.4%'),
    borderRadius: 50,
    flexDirection: 'row',
  },
  image: {
    margin: wp('5.2%'),
    padding: hp('1%'),
    height: 23,
    width: 22,
  },
  label: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: FONT_WEIGHT_600,
    textAlign: 'center',
    fontFamily: MONTSERRAT_BOLD,
    marginVertical: hp('2.5%'),
    marginLeft: wp('6%'),
  },
  iconconatiner: {
    position: 'absolute',
    left: 15,
  },
  cancelbutton: {
    backgroundColor: ' rgba(73, 255, 9, 0.15)',
    marginLeft: wp('4.4%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('5.35%'),
    borderRadius: 25,
  },
  savebutton: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    marginHorizontal: wp('5.4%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('7%'),
    marginRight: wp('9.5%'),
    borderRadius: 25,
  },
  logoutbutton: {
    backgroundColor: ' rgba(73, 255, 9, 0.15)',
    marginLeft: wp('4.4%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('7.35%'),
    borderRadius: 25,
    alignSelf:'center'
  },
})

export default styles
