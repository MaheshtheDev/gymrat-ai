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

export enum CRSErrors {
  SomeProblemHasOccured = 'SC000',
  RetryAnotherAttempt = 'SC409',
  NameMatchRequired = 'SC050',
  UserNotFound = 'SC101',
  UserAlreadyRegistered = 'SC102',
  InvalidToken01 = 'SC103',
  UserMismatch = 'SC104',
  RecoveryAnswerFailed = 'SC105',
  HostTokenExpired = 'SC106',
  UserTokenExpired = 'SC107',
  ActionTokenExpired = 'SC108',
  PasswordTokenExpired = 'SC109',
  RefreshTokenExpired = 'SC110',
  RefreshTokenPremature = 'SC111',
  MobileTokenExpired = 'SC112',
  LoginFailure01 = 'SC113',
  AccountTemporarilyLockedOut1 = 'SC114',
  IPTemporarilyLockedOut = 'SC115',
  UserDisabled = 'SC116',
  PreauthTokenExpired = 'SC117',
  UserException = 'SC120',
  HostNotFound = 'SC201',
  InvalidToken = 'SC202',
  HostMisconfigured = 'SC203',
  HostDisabled = 'SC204',
  CustomerHostException = 'SC220',
  UserAlreadyIdentified = 'SC301',
  UserIdentityRequired = 'SC302',
  UserIdentificationFailed = 'SC303',
  PhonenumberRequired = 'SC304',
  OTPFailed = 'SC305',
  ThinFileError = 'SC306',
  UnenrollmentError = 'SC307',
  FeatureEnrollmentError = 'SC308',
  Mobileauthorizationrequired = 'SC309',
  IDAlreadyStored = 'SC310',
  IDFSError = 'SC311',
  InvalidFlagException = 'SC312',
  EnrollmentError = 'SC313',
  MobileVerificationFailed = 'SC314',
  IDFSUnavailable = 'SC315',
  IDFSRateLimitException = 'SC316',
  IDFSDataException = 'SC317',
  UserEnrollmentLimitExceeded = 'SC318',
  IDFSFault = 'SC319',
  VS3Unavailable = 'SC320',
  IDFSUserLockedWait72hrs = 'SC321',
  IDFSRequestAlreadyComplete = 'SC322',
  DirectTokenExpired = 'SC401',
  UnauthorizedConsumerAccess = 'SC402',
  LoginFailure = 'SC403',
  DataAccessRequired = 'SC405',
  AlertNotFound = 'SC406',
  UnauthorizedPremiumFeatureAccess = 'SC407',
  CustomerTokenExpired = 'SC501',
  AccountTemporarilyLockedOut2 = 'SC503',
  IPTemporarilyLockedOut01 = 'SC504',
  CustomerDisabled = 'SC505',
  CustomerException = 'SC520',
  ConsumerMappingFailed = 'SC601',
  Maintenance = 'SC701',
  AdminTokenExpired = 'SC801',
  CustomerNotFound = 'SC802',
  AdminException = 'SC820',
  UsernameRequired = 'SC901',
  usernamemustbeavalidemail = 'SC902',
  passwordrequired1 = 'SC903',
  emailrequired = 'SC904',
  validemailaddressrequired = 'SC905',
  TendigitUSphonenumberonly = 'SC906',
  firstnamerequired = 'SC907',
  lastnamerequired = 'SC908',
  passwordrequired = 'SC909',
  passwordlength820charsrequired = 'SC910',
  recoveryquestionrequired = 'SC911',
  recoveryquestiongreaterthan0required = 'SC912',
  recoveryanswerrequired = 'SC913',
  passwordtokenrequired = 'SC914',
  datemustbeinthepast = 'SC915',
  socialsecuritynumberrequired = 'SC916',
  NineDigitSocialSecuritynumberonly = 'SC917',
  streetaddressrequired = 'SC918',
  addresscityrequired = 'SC919',
  addressstaterequired = 'SC920',
  addresszipcoderequired = 'SC921',
  transactionkeyrequired = 'SC922',
  quizidrequired = 'SC923',
  quizidgreaterthan0required = 'SC924',
  questionidrequired = 'SC925',
  questionidgreaterthan0required = 'SC926',
  answeridrequired = 'SC927',
  answeridgreaterthan0required = 'SC928',
  SMScoderequired = 'SC929',
  oldpasswordrequired = 'SC930',
  newpasswordrequired = 'SC931',
  actiontokenrequired = 'SC932',
  newrecoveryquestionrequired = 'SC933',
  newrecoveryquestiongreaterthan0required = 'SC934',
  newrecoveryanswerrequired = 'SC935',
  currentrecoveryanswerrequired = 'SC936',
  apikeyrequired = 'SC937',
  apisecretrequired = 'SC938',
  tokenrequired = 'SC939',
  addressstatemustbe2characters = 'SC940',
  addresszipcodemustbe5digits = 'SC941',
  Missingrequestbody = 'SC960',
  RequiredPropertyError = 'SC949',
  DateFormatError = 'SC950',
  NumberExpected = 'SC951',
  GeneralDataInputError = 'SC970',
  NonSpecifiedError = 'SC975',
  Webhooksnotconfigured = 'SC980',
  Invalidwebhooktype = 'SC981',
  Errorsendingwebhook = 'SC982',
  EquifaxDeliveryException = 'SC983',
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
