
import { FONT_FAMILY_REGULAR, MONTSERRAT_BLACK, MONTSERRAT_EXTRA_LIGHT, MONTSERRAT_MEDIUM } from '@styles'
import Colors from '@styles/colors'
import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.BORDERGREEN,
    marginLeft: wp('5.4%'),
    marginRight: wp('5%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    marginTop:hp('2%'),
    opacity:0.75,
    color:Colors.WHITE,
    fontFamily:MONTSERRAT_MEDIUM
  },
})

export default styles
