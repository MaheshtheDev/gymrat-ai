import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import { FONT_SIZE_16, FONT_WEIGHT_OR_TEXT, MONTSERRAT_MEDIUM } from '@styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'
const styles = StyleSheet.create({
  tablecontainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: hp('0.5%'),
  },
  tableitem: {
    fontSize: FONT_SIZE_16,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_MEDIUM,
    color: Colors.WHITE,
    justifyContent: 'space-between',
    flex: 1,
  },
  repsitem: {
    fontSize: FONT_SIZE_16,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_MEDIUM,
    color: Colors.WHITE,
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: wp('2.5%'),
  },
})

export default styles
