import { StyleSheet } from 'react-native'
import { FONT_SIZE_20, FONT_WEIGHT_OR_TEXT, MONTSERRAT_LIGHT } from '../../../styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '../../../styles/colors'

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titlecontainer: {
    marginTop: wp('5%'),
  },

  descriptioncontainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    marginBottom: hp('5%'),
    marginLeft: wp('1.5%'),
  },
  buttoncontainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'black',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,

    borderWidth: 1,
    borderTopColor: Colors.YELLOW,
    justifyContent: 'center',
    alignContent: 'center',
  },

  loginbtncontainer: {
    marginBottom: hp('2%'),
    marginTop: hp('5.8%'),
  },
  ortxt: {
    marginTop: wp('4%'),
    marginBottom: wp('4%'),
  },
  orlabeltxt: {
    fontSize: FONT_SIZE_20,
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_LIGHT,
    alignSelf: 'center',
  },
  googlebtncoinatiner: {
    marginBottom: hp('2%'),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  button: {
    width: 200,
    height: 44,
  },
})
