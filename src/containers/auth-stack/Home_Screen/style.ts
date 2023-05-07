import { StyleSheet } from 'react-native'
import {
  MONTSERRAT_BOLD,
  FONT_SIZE_10,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_20,
  FONT_SIZE_6,
  FONT_SIZE_8,
  FONT_WEIGHT_600,
  FONT_WEIGHT_OR_TEXT,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_TITLE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  MONTSERRAT_REGULAR,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_LIGHT,
  FONT_SIZE_9,
} from '@styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '@styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  cardcontainer: {
    paddingVertical: hp('1%'),
    flexDirection: 'row',
    backgroundColor: Colors.SHARK,
  },

  mainroundedcontainer: {
    display: 'flex',
    backgroundColor: 'red',
    flexDirection: 'row',
  },

  label1: {
    color: Colors.GUMBO,
    fontSize: FONT_SIZE_12,
    textAlign: 'center',
    fontFamily: MONTSERRAT_REGULAR,
  },
  roundcontainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: Colors.BLACK,
    marginHorizontal: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily: MONTSERRAT_MEDIUM,
    textAlign: 'center',
  },
  subtxt: {
    fontSize: FONT_SIZE_8,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily: MONTSERRAT_MEDIUM,
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  bottomtxt1: {
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_REGULAR,
    color: Colors.GUMBO,
    marginTop: hp('0.5%'),
    marginHorizontal: wp('1%'),
    marginBottom: hp('1.5%'),
  },
  card: {
    backgroundColor: Colors.CYLINDRICAL_GREEN,
    marginLeft: wp('3.5%'),
    marginRight: wp('3.5%'),
    borderRadius: 10,
    paddingLeft: wp('4%'),
    paddingVertical: hp('1%'),
    marginBottom: wp('1%'),
  },
  item: {
    marginHorizontal: wp('1%'),
    marginVertical: hp('0.2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableitem1: {
    flex: 1,
    fontSize: FONT_SIZE_16,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_LIGHT,
    color: Colors.SPRING_GREEN,
  },
  tableitem: {
    fontSize: FONT_SIZE_16,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_MEDIUM,
    color: Colors.WHITE,
    justifyContent: 'space-between',
    flex: 1,
  },
  table1: {
    fontSize: FONT_SIZE_16,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_MEDIUM,
    color: Colors.WHITE,
    paddingRight: wp('12.4%'),
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
  setsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  repsContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: wp('1.5%'),
  },
  tablecontainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: hp('0.5%'),
  },
  title: {
    fontSize: FONT_SIZE_20,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    color: Colors.WHITE,
    fontFamily: MONTSERRAT_BOLD,
    marginVertical: hp('1.2%'),
    marginLeft: wp('4%'),
  },
  mealconatiner: {
    flexDirection: 'row',
  },
  heading: {
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontSize: FONT_SIZE_12,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.SPRING_GREEN,
    opacity: 0.4,
    marginBottom: hp('0.3%'),
    marginTop: hp('0.5%'),
  },
  heading1: {
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontSize: FONT_SIZE_12,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.WHITE,
    opacity: 0.4,
    marginBottom: hp('0.3%'),
    marginTop: hp('0.5%'),
  },
  headingmd: {
    fontSize: FONT_SIZE_9,
    fontFamily: MONTSERRAT_BOLD,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    marginTop: hp('0.55%'),
    color: Colors.WHITE,
    marginHorizontal: wp('0.2%'),
  },
  subheading: {
    fontSize: FONT_SIZE_14,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.WHITE,
    marginBottom: hp('0.4%'),
  },
  subheading1: {
    fontSize: FONT_SIZE_18,
    fontWeight: FONT_WEIGHT_TITLE,
    fontFamily: MONTSERRAT_BOLD,
    color: Colors.SELECTIVE_YELLOW,
    marginTop: hp('1%'),
  },
  workout: {
    flex: 1,
    fontSize: FONT_SIZE_18,
    fontWeight: FONT_WEIGHT_TITLE,
    fontFamily: MONTSERRAT_BOLD,
    color: Colors.LIGHT_GREEN,
    marginTop: hp('1%'),
  },
  goalcontainer: {
    justifyContent: 'center',
    marginHorizontal: wp('11%'),
  },
  viewalltxt: {
    color: Colors.SELECTIVE_YELLOW,
    fontSize: FONT_SIZE_12,
    fontFamily: MONTSERRAT_MEDIUM,
  },
  goaltxt: {
    fontSize: FONT_SIZE_14,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily: MONTSERRAT_REGULAR,
    color: Colors.GUMBO,
    textAlign: 'center',
  },
  gaintxt: {
    color: Colors.CHLOROPHYL_GREEN,
    fontWeight: FONT_WEIGHT_600,
    fontSize: FONT_SIZE_14,
    fontFamily: MONTSERRAT_BOLD,
    textAlign: 'center',
  },
  goalchangetxt: {
    fontSize: FONT_SIZE_6,
    color: Colors.CORDUROY,
    textDecorationLine: 'underline',
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily: MONTSERRAT_REGULAR,
    textAlign: 'right',
  },
  flatlist: {
    flexDirection: 'row',
    flex: 1,
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconcontainer: {
    flexDirection: 'row',
    marginRight: wp('4%'),
  },
  modaltitle: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_18,
    fontFamily: MONTSERRAT_BOLD,
    textAlign: 'center',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  label: {
    color: Colors.WHITE,
    fontWeight: FONT_WEIGHT_OR_TEXT,
    fontFamily: MONTSERRAT_BOLD,
    marginHorizontal: wp('5%'),
  },
  txtinput: {
    backgroundColor: Colors.BLACK,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.BORDERGREEN,
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    marginTop: hp('1%'),
    marginRight: wp('8%'),
    color: Colors.WHITE,
    marginBottom: hp('3%'),
    marginLeft: wp('3%'),
  },
  modalcontainer: {
    backgroundColor: Colors.BLACK,
    alignSelf: 'center',
    height: WINDOW_HEIGHT * 0.52,
    width: WINDOW_WIDTH * 0.9,
    borderRadius: 7,
  },
  savebutton: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    borderRadius: 27,
    width: '40%',
    marginRight: wp('6%'),
  },
  cancelbutton: {
    backgroundColor: Colors.CHLOROPHYL_GREEN,
    borderRadius: 27,
    width: '40%',
    marginLeft: wp('4%'),
  },
  mealview: {
    marginVertical: hp('1%'),
  },
})
