import Colors from '@styles/colors'
import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CYLINDRICAL_GREEN,
    marginLeft: wp('3.5%'),
    marginRight: wp('3.5%'),
    borderRadius:10,
    paddingLeft: wp('4%'),
    paddingTop:hp('1%'),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
})

export default styles
