export enum TextFormat {
  HEADER = 'header',
  TITLE = 'title',
  BODY = 'body',
  SMALL = 'small',
  EXTRA_SMALL = 'extraSmall',
}

export enum ButtonFormat {
  GOOGLE = 'Google',
  APPLE = 'Apple',
  NONE = 'none',
  LOGIN = 'Login',
}

export enum InputFormat {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  DECIMAL = 'decimal',
  PHONE = 'phone',
  EMAIL = 'email',
  DATE = 'date',
  TOUCHABLE = 'touchable',
}

export enum InputKeyboardType {
  TEXT = 'default',
  NUMBER = 'numeric',
  EMAIL = 'email-address',
  PHONE = 'phone-pad',
}

export enum InputErrorType {
  MISSING_VALUE = 'VALIDATION_ERROR_VALUE_MISSING',
  PASSWORD_GREATER_THAN_EIGHT = 'VALIDATION_GREATER_THAN_EIGHT',
  INVALID_VALUE = 'VALIDATION_ERROR_VALUE_INVALID',
  VALUE_NOT_TWO_DECIMAL_PLACE = 'ENTER_VALUE_UPTO_TWO_DECIMAL_PLACES',
  VALUE_NOT_FOUR_CHARACTERS = 'ENTER_FOUR_DIGITS',
  VALUE_LESS_THAN_HUNDRED = 'VALUE_SHOULD_BE_LESS_THAN_HUNDRED',
  VALUE_GREATER_THAN_ZERO = 'VALUE_SHOULD_BE_GREATER_THAN_ZERO',
  VALUE_GREATER_THAN_ZERO_INTEREST = 'VALUE_SHOULD_BE_GREATER_THAN_ZERO_INTEREST',
  USERNAME_LENGTH = 'USERNAME_LENGTH',
  NO_SPECIAL_CHARACTERS_ALLOWED = 'NO_SPECIAL_CHARACTERS_ALLOWED',
  PHONE_DIGITS_ALLOWED = 'ENTER_TEN_DIGITS',
  VALID_EMAIL_ID = 'ENTER_VALID_EMAIL_ID',
  VALID_DATE = 'ENTER_VALID_DATE',
  VALID_ZIPCODE = 'ENTER_VALID_ZIPCODE',
  VALID_SOCIAL_SECURITY_NUMBER = 'ENTER_VALID_SOCIAL_SECURITY_NUMBER',
  ONE_SPECIAL_CHARACTER_REQUIRED = 'ENTER_ONE_SPECIAL_CHARACTER_REQUIRED',
  ONE_CAPITAL_LETTER_REQUIRED = 'ENTER_ONE_CAPITAL_LETTER_REQUIRED',
  ONE_SMALL_LETTER_REQUIRED = 'ENTER_ONE_SMALL_LETTER_REQUIRED',
  LENGTH_GT_SEVEN_REQUIRED = 'ENTER_LENGTH_GT_SEVEN_REQUIRED',
  ENTER_VALID_OTP = 'ENTER_VALID_OTP',
}

export enum ValidationType {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  PASSWORD_MATCH = 'passwordMatch',
  MOBILE = 'mobile',
}

export enum AccountVerificationState {
  VERIFYING = 'verifying',
  VERIFIED = 'verified',
  NOT_VERIFIED = 'not_verified',
}

export enum VerificationFormat {
  EMAIL = 'email',
  PHONE = 'phone',
  GOOGLE_SSO = 'google_sso',
  CHANGE_PASSWORD = 'change_password',
  APPLE_SSO = 'apple_sso',
}

export enum SSOProvider {
  GOOGLE = 'Google',
  APPLE = 'Apple',
}

export enum AsyncStateStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  NO_DATA = 'nodata',
}

export enum SSOSource {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web',
}

export enum MXWidgetResultType {
  SUCCESS = 'success',
  FAILED = 'failed',
  CLOSED = 'closed',
}

export enum MXNamespaceType {
  CONNECT = 'connect',
}

export enum MXActionType {
  MEMBER_CONNECTED = '/memberConnected',
  MEMBER_CREATE_ERROR = '/createMemberError',
  MEMBER_STATUS_UPDATED = '/memberStatusUpdate',
  OAUTH_REQUESTED = '/oauthRequested',
  OAUTH_ERROR = '/oauthError',
  CONNECTED_PRIMARY = '/connected/primaryAction',
}

export enum AsyncStorageKeys {
  UTOKEN = 'utoken',
  OWN_IT_GUID = 'ownit_guid',
  IS_72HR_ACCOUNT_LOCKED = '72hr_account_locked',
  EFX_URL = 'efxUrl',
  EFX_TOKEN = 'efxToken',
}

export enum AWSCognitoError {
  USER_NOT_VERIFIED_EXCEPTION = 'UserNotConfirmedException',
  NOT_AUTHORIZED = 'NotAuthorizedException',
  USER_ALREADY_EXISTS = 'UsernameExistsException',
}

export enum InputType {
  TEXT_INPUT = 'textInput',
  DATE_INPUT = 'dateInput',
  DROPDOWN_INPUT = 'dropdownInput',
  SECTION_HEADER = 'sectionHeader',
}

export enum PasscodeStatus {
  OTP_SENT = 'OTP_SENT',
  VERIFYING_OTP = 'VERIFYING_OTP',
  RESEND_OTP = 'RESEND_OTP',
}

export enum StepType {
  PURCHASE = 'purchase',
  CREDIT_SCORE = 'credit-score',
  BANK_ACCOUNT = 'bank-accounts',
}

export enum MXAccountType {
  MORTGAGE = 'mortgage',
}
