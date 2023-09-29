import { StyleSheet } from 'react-native'
import {
  FONT_FAMILY_REGULAR,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_26,
  FONT_WEIGHT_OR_TEXT,
  MONTSERRAT_REGULAR,
} from '../../styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titlecontainer: {
    marginTop: hp('2%'),
  },
  title: {
    fontSize: FONT_SIZE_26,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginLeft: wp('8%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  subtitle: {
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    marginHorizontal: wp('9%'),
    opacity: 0.5,
    marginVertical: hp('1.2%'),
    fontFamily: MONTSERRAT_REGULAR,
  },
  label: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontSize: FONT_SIZE_16,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: hp('3%'),
    marginHorizontal: wp('9%'),
  },
  label1: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_REGULAR,
  },
  txtinput: {
    backgroundColor: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.BORDERGREEN,
    marginLeft: wp('5.7%'),
    marginRight: wp('5%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    opacity: 1,
    marginTop: hp('1%'),
    color: Colors.WHITE,
    fontFamily: MONTSERRAT_REGULAR,
  },
  inputError: {
    color: Colors.RED,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontSize: FONT_SIZE_12,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: hp('1%'),
    marginHorizontal: wp('9%'),
  },
  buttoncontainer: {
    marginTop: hp('2%'),
  },
  dropdown: {
    flexDirection: 'row',

    backgroundColor: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.BORDERGREEN,
    marginHorizontal: wp('5.5%'),
    marginTop: hp('2%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    opacity: 0.58,
    color: Colors.WHITE,
    fontFamily: MONTSERRAT_REGULAR,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',

    borderColor: Colors.BORDERGREEN,
    opacity: 0.75,
    borderRadius: 5,
    borderWidth: 2,
  },
  option: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: Colors.BORDERGREEN,
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  regularOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#49FF09BF',
    borderRadius: 10,
    marginVertical: 10,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#49FF09BF',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.CHLOROPHYL_GREEN,
  },
  optionText: {
    color: 'white',
    paddingHorizontal: 5,
    fontFamily: MONTSERRAT_REGULAR,
  },
  selectedOptionText: {
    color: 'black',
    paddingHorizontal: 5,
    fontFamily: MONTSERRAT_REGULAR,
  },
  disabledButton: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    padding: 5,
    borderRadius: 25,
    opacity: 0.5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    padding: 5,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
})
