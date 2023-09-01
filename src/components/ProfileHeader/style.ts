import {
  FONT_SIZE_12,
  FONT_SIZE_18,
  FONT_WEIGHT_OR_TEXT,
  MONTSERRAT_REGULAR,
  MONTSERRAT_LIGHT,
} from '@styles'
import Colors from '@styles/colors'
import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
  },

  profilebutton: {
    padding: hp('2%'),
    marginLeft: wp('3%'),
  },
  username: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: FONT_SIZE_18,
  },
  agenumber: {
    color: Colors.CAPE_COD,
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_LIGHT,
    marginVertical: hp('0.3%'),
  },
  profilecontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  iconcontainer:{
    marginHorizontal:wp('3%')
  }
})

export default styles
