import { StyleSheet } from 'react-native'
import {
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
  iconcontainer: {
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  title:{
    fontSize:FONT_SIZE_26,
    fontWeight:FONT_WEIGHT_OR_TEXT,
    color:Colors.WHITE,
    alignSelf:'center',
    fontFamily:MONTSERRAT_REGULAR
  },
  titlecontainer:{
    marginTop:hp('2%')
  }
})
