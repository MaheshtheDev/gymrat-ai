export const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export const stateCodes = [
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const CRSErrorCodes = [
  {
    error: 'There seems to be some issue occurred on our side',
    code: 'SC000',
  },
  {
    error: 'Name mastch required',
    code: 'SC050',
  },
  {
    error: 'User Not Found',
    code: 'SC101',
  },
  {
    error: 'User Already Registered',
    code: 'SC102',
  },
  {
    error: 'Invalid Token',
    code: 'SC103',
  },
  {
    error: 'User Mismatch',
    code: 'SC104',
  },
  {
    error: 'Recovery Answer Failed',
    code: 'SC105',
  },
  {
    error: 'Host Token Expired',
    code: 'SC106',
  },
  {
    error: 'User Token Expired',
    code: 'SC107',
  },
  {
    error: 'Action Token Expired',
    code: 'SC108',
  },
  {
    error: 'Password Token Expired',
    code: 'SC109',
  },
  {
    error: 'Refresh Token Expired',
    code: 'SC110',
  },
  {
    error: 'Refresh Token Premature',
    code: 'SC111',
  },
  {
    error: 'Mobile Token Expired',
    code: 'SC112',
  },
  {
    error: 'Login Failure',
    code: 'SC113',
  },
  {
    error: 'Account Temporarily Locked Out',
    code: 'SC114',
  },
  {
    error: 'IP Temporarily Locked Out',
    code: 'SC115',
  },
  {
    error: 'User Disabled',
    code: 'SC116',
  },
  {
    error: 'Preauth Token Expired',
    code: 'SC117',
  },
  {
    error: 'User Exception',
    code: 'SC120',
  },
  {
    error: 'Host Not Found',
    code: 'SC201',
  },
  {
    General: '*',
    error: 'Invalid Token',
    code: 'SC202',
  },
  {
    error: 'Host Misconfigured',
    code: 'SC203',
  },
  {
    error: 'Host Disabled',
    code: 'SC204',
  },
  {
    error: 'Customer Host Exception',
    code: 'SC220',
  },
  {
    error: 'User Already Identified',
    code: 'SC301',
  },
  {
    error: 'User Identity Required',
    code: 'SC302',
  },
  {
    error: 'User Identification Failed',
    code: 'SC303',
  },
  {
    error: 'Phone Number Required',
    code: 'SC304',
  },
  {
    error: 'OTP Failed',
    code: 'SC305',
  },
  {
    error: 'Thin File Error',
    code: 'SC306',
  },
  {
    error: 'Unenrollment Error',
    code: 'SC307',
  },
  {
    error: 'Feature Enrollment Error',
    code: 'SC308',
  },
  {
    error: 'Mobile authorization required',
    code: 'SC309',
  },
  {
    error: 'ID Already Stored',
    code: 'SC310',
  },
  {
    error: 'IDFS Error',
    code: 'SC311',
  },
  {
    error: 'Invalid Flag Exception',
    code: 'SC312',
  },
  {
    error: 'Enrollment Error',
    code: 'SC313',
  },
  {
    error: 'Mobile Verification Failed',
    code: 'SC314',
  },
  {
    error: 'IDFS Unavailable',
    code: 'SC315',
  },
  {
    error: 'IDFS Rate Limit Exception ',
    code: 'SC316',
  },
  {
    error: 'IDFS Data Exception',
    code: 'SC317',
  },
  {
    error: 'User Enrollment Limit Exceeded',
    code: 'SC318',
  },
  {
    error: 'IDFS Fault',
    code: 'SC319',
  },
  {
    error: 'VS3 Unavailable',
    code: 'SC320',
  },
  {
    error: 'IDFS User Locked Wait 72hrs',
    code: 'SC321',
  },
  {
    error: 'IDFS Request Already Complete',
    code: 'SC322',
  },
  {
    error: 'Direct Token Expired',
    code: 'SC401',
  },
  {
    error: 'Unauthorized Consumer Access',
    code: 'SC402',
  },
  {
    error: 'Login Failure',
    code: 'SC403',
  },
  {
    error: 'Data Access Required',
    code: 'SC405',
  },
  {
    error: 'Alert Not Found',
    code: 'SC406',
  },
  {
    error: 'Unauthorized Premium Feature Access',
    code: 'SC407',
  },
  {
    error: 'Customer Token Expired',
    code: 'SC501',
  },
  {
    error: 'Login Failure',
    code: 'SC502',
  },
  {
    error: 'Account Temporarily Locked Out',
    code: 'SC503',
  },
  {
    error: 'IP Temporarily Locked Out',
    code: 'SC504',
  },
  {
    error: 'Customer Disabled',
    code: 'SC505',
  },
  {
    error: 'Customer Exception',
    code: 'SC520',
  },
  {
    error: 'Consumer Mapping Failed',
    code: 'SC601',
  },
  {
    error: 'Maintenance',
    code: 'SC701',
  },
  {
    error: 'Admin Token Expired',
    code: 'SC801',
  },
  {
    error: 'Customer Not Found',
    code: 'SC802',
  },
  {
    error: 'Admin Exception',
    code: 'SC820',
  },
  {
    error: 'username required',
    code: 'SC901',
  },
  {
    error: 'username must be a valid email',
    code: 'SC902',
  },
  {
    error: 'password required',
    code: 'SC903',
  },
  {
    error: 'email required',
    code: 'SC904',
  },
  {
    error: 'valid email address required',
    code: 'SC905',
  },
  {
    error: '10-digit US phone number only',
    code: 'SC906',
  },
  {
    error: 'first name required',
    code: 'SC907',
  },
  {
    error: 'last name required',
    code: 'SC908',
  },
  {
    error: 'password required',
    code: 'SC909',
  },
  {
    error: 'password length 8-20 chars required',
    code: 'SC910',
  },
  {
    error: 'recovery question required',
    code: 'SC911',
  },
  {
    error: 'recovery question greater than 0 required',
    code: 'SC912',
  },
  {
    error: 'recovery answer required',
    code: 'SC913',
  },
  {
    error: 'password token required',
    code: 'SC914',
  },
  {
    error: 'message, date must be in the past',
    code: 'SC915',
  },
  {
    error: 'social security number required',
    code: 'SC916',
  },
  {
    error: '9-digit social security number only',
    code: 'SC917',
  },
  {
    error: 'street address required',
    code: 'SC918',
  },
  {
    error: 'address city required',
    code: 'SC919',
  },
  {
    error: 'address state required',
    code: 'SC920',
  },
  {
    error: 'address zipcode required',
    code: 'SC921',
  },
  {
    error: 'transaction key required',
    code: 'SC922',
  },
  {
    error: 'quiz id required',
    code: 'SC923',
  },
  {
    error: 'quiz id greater than 0 required',
    code: 'SC924',
  },
  {
    error: 'question id required',
    code: 'SC925',
  },
  {
    error: 'question id greater than 0 required',
    code: 'SC926',
  },
  {
    error: 'answer id required',
    code: 'SC927',
  },
  {
    error: 'answer id greater than 0 required',
    code: 'SC928',
  },
  {
    error: 'SMS code required',
    code: 'SC929',
  },
  {
    error: 'old password required',
    code: 'SC930',
  },
  {
    error: 'new password required',
    code: 'SC931',
  },
  {
    error: 'action token required',
    code: 'SC932',
  },
  {
    error: 'new recovery question required',
    code: 'SC933',
  },
  {
    error: 'new recovery question greater than 0 required',
    code: 'SC934',
  },
  {
    error: 'new recovery answer required',
    code: 'SC935',
  },
  {
    error: 'current recovery answer required',
    code: 'SC936',
  },
  {
    error: 'api key required',
    code: 'SC937',
  },
  {
    error: 'api secret required',
    code: 'SC938',
  },
  {
    error: 'token required',
    code: 'SC939',
  },
  {
    error: 'address state must be 2 characters',
    code: 'SC940',
  },
  {
    error: 'address zipcode must be 5 digits',
    code: 'SC941',
  },
  {
    error: 'Missing request body',
    code: 'SC960',
  },
  {
    error: 'Required Property Error',
    code: 'SC949',
  },
  {
    error: 'Date Format Error',
    code: 'SC950',
  },
  {
    error: 'Number Expected',
    code: 'SC951',
  },
  {
    error: 'General Data Input Error',
    code: 'SC970',
  },
  {
    error: 'Non-specified Error',
    code: 'SC975',
  },
  {
    error: 'Webhooks not configured',
    code: 'SC980',
  },
  {
    error: 'Invalid webhook type',
    code: 'SC981',
  },
  {
    error: 'Error sending webhook',
    code: 'SC982',
  },
  {
    error: 'Equifax Delivery Exception',
    code: 'SC983',
  },
];

export const validZipCodes = [
  37013, 37076, 37115, 37201, 37203, 37204, 37205, 37206, 37207, 37208, 37209,
  37210, 37211, 37212, 37214, 37215, 37216, 37086, 37167, 37066, 37072, 37075,
  37148, 37014, 37027, 37046, 37135, 37174, 37179, 37087, 37090, 37138,
];
