import { StyleSheet } from 'react-native'
import {
  MONTSERRAT_BOLD,
  FONT_SIZE_13,
  FONT_WEIGHT_REGULAR,
  MONTSERRAT_REGULAR,
  MONTSERRAT_LIGHT,
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
  title: {
    fontFamily: MONTSERRAT_LIGHT,
    fontSize: FONT_SIZE_13,
    fontWeight: FONT_WEIGHT_REGULAR,
    color: Colors.JAVA,
    marginBottom: hp('0.3%'),
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_13,
    fontFamily: MONTSERRAT_LIGHT,
    fontWeight: FONT_WEIGHT_REGULAR,


    
  },
  titlecontainer: {
    marginTop: hp('1.5%'),
  },
  maincontainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: wp('9%'),
  },
  subcontainer: {
    marginLeft: wp('9%'),
    flex:1
  },
  emaillabel: {
    color: Colors.JAVA,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_13,
    fontFamily: MONTSERRAT_BOLD,
  },
  accountlinkcontainer: {
    marginVertical: hp('3%'),
    marginHorizontal: wp('9%'),
  },
  linkconatiner: {
    marginVertical: hp('1.5%'),
  },
  linkemailcontainer: {
    flexDirection: 'row',   
  },
  email: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_13,
    flexWrap:'wrap',
    fontFamily: MONTSERRAT_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR,
    marginLeft: wp('1%'),
  },
  save:{
    textAlign:'center',
    color:Colors.BLACK,
    flex:1
  },
  linkemailcontainer1: {
    flexDirection: 'row',
    width: '40%',
    backgroundColor:Colors.CHLOROPHYL_GREEN,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.YELLOW,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    marginTop: hp('0.5%'),
  },
  ss:{
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.YELLOW,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    marginTop: hp('0.5%'),
  }
})
