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
  coinatiner: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  title: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_26,
    fontFamily: MONTSERRAT_REGULAR,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    marginLeft: wp('7%'),

    
  },
  subtitle: {
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('7%'),
    opacity: 0.5,
    marginVertical: hp('1.2%'),
    fontFamily:MONTSERRAT_REGULAR,
  },
  continuebutton: {
    marginHorizontal: wp('9%'),
    marginVertical: hp('1.2%'),
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  buttoncontainer:{
    marginVertical:hp('4.5%')
  }
  
})
