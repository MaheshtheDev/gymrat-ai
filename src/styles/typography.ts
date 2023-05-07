import { normalize, scaleFont } from './mixins'
import { Dimensions, Platform, PixelRatio } from 'react-native'

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans-Regular'
export const FONT_FAMILY_BOLD = 'OpenSans-Bold'
export const MONTSERRAT = 'Montserrat-Regular'
export const SF_PRO = 'SF-Pro-Display-Bold'
export const SF_PRO_SEMI_BOLD = 'sf-pro-text-semibold'
export const SF_PRO_HEAVY = 'sf-pro-text-heavy'
export const MONTSERRAT_BLACK = 'Montserrat-Black'
export const MONTSERRAT_BLACK_ITALIC = 'Montserrat-BlackItalic'
export const MONTSERRAT_BOLD = 'Montserrat-Bold'
export const MONTSERRAT_BOLD_ITALIC = 'Montserrat-BoldItalic'
export const MONTSERRAT_EXTRA_BOLD = 'Montserrat-ExtraBold'
export const MONTSERRAT_EXTRA_BOLD_ITALIC = 'Montserrat-ExtraBoldItalic'
export const MONTSERRAT_EXTRA_LIGHT = 'Montserrat-ExtraLight'
export const MONTSERRAT_EXTRA_LIGHT_ITALIC = 'Montserrat-ExtraLightItalic'
export const MONTSERRAT_ITALIC = 'Montserrat-Italic'
export const MONTSERRAT_LIGHT = 'Montserrat-Light'
export const MONTSERRAT_LIGHT_ITALIC = 'Montserrat-LightItalic'
export const MONTSERRAT_MEDIUM = 'Montserrat-Medium'
export const MONTSERRAT_MEDIUM_ITALIC = 'Montserrat-MediumItalic'
export const MONTSERRAT_REGULAR = 'Montserrat-Regular'
export const MONTSERRAT_SEMIBOLD = 'Montserrat-SemiBold'
export const MONTSERRAT_SEMIBOLD_ITALIC = 'Montserrat-SemiBoldItalic'
export const MONTSERRAT_THIN = 'Montserrat-Thin'
export const MONTSERRAT_THIN_ITALIC = 'Montserrat-ThinItalic'

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400'
export const FONT_WEIGHT_600 = '600'
export const FONT_WEIGHT_TITLE = '800'
export const FONT_WEIGHT_OR_TEXT = '500'
export const FONT_WEIGHT_BOLD = '600'
export const FONT_WEIGHT_700 = '700'

// export const FONT_WEIGHT_DESCRIPTION = 'Bold'

// FONT SIZE
export const FONT_SIZE_16 = scaleFont(16)
export const FONT_SIZE_8 = scaleFont(8)
export const FONT_SIZE_6 = scaleFont(6)

export const FONT_SIZE_9 = scaleFont(9)

export const FONT_SIZE_10 = scaleFont(10)

export const FONT_SIZE_14 = scaleFont(14)
export const FONT_SIZE_12 = scaleFont(12)
export const FONT_SIZE_40 = scaleFont(40)
export const FONT_SIZE_20 = scaleFont(20)
export const FONT_SIZE_26 = scaleFont(26)
export const FONT_SIZE_18 = scaleFont(18)
export const FONT_SIZE_24 = scaleFont(24)
export const FONT_SIZE_13 = scaleFont(13)

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24)
export const LINE_HEIGHT_20 = scaleFont(20)
export const LINE_HEIGHT_16 = scaleFont(16)

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
}

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
}
