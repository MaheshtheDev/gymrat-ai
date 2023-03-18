import {AsyncStateStatus, InputFormat, InputType} from './enum-type';
import {OnClick, ValidationRule} from './function-type';

export interface Account {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  givenName?: string;
  familyName?: string;
  photo?: string;
  name?: string;
  ownitGuid?: string;
  active?: boolean;
}

export interface CheckBoxItem {
  key: string;
  onClick: OnClick;
}

export interface ValidationResult {
  error?: string;
  success: boolean;
}

export interface InputValueResult {
  isValid: boolean;
  result: ValidationResult[];
  value: string;
}

export interface OnboardingSlide {
  backColor: string;
  body: string;
  color: string;
  header: string;
  logo: any;
}

export interface AsyncState<T> {
  state: AsyncStateStatus;
  data: T;
  code?: number;
  error: string;
}

export interface MXUserResponse {
  user?: User;
}

export interface User {
  user_id?: number;
  user_mx_guid?: string;
  user_mx_widget_url?: string;
  email?: string;
}

export interface PreauthTokenResponse {
  ownit_guid: string;
  pre_auth_token: PreAuthToken;
}

export interface ExistingUserPreauthTokenResponse {
  ownit_guid: string;
  user_details: PreAuthUserTokenDetails;
  crs_userid: string;
}

export interface PreAuthUserTokenDetails {
  pre_auth_token: PreAuthToken;
}

export interface EFXConfigResponse {
  secret: string;
  id: string;
  url: string;
}

export interface EFXTokenReponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  IP_ADDRESS: string;
}

export interface PreAuthToken {
  id: string;
  email: string;
  fname: string;
  lname: string;
  idpass: boolean;
  token: string;
  expires: number;
  refresh: string;
}

export interface UserIdentityReponse {
  id: string;
  email: string;
  fname: string;
  lname: string;
  idpass: boolean;
  createdAt: number;
  updatedAt: number;
  smsMsg: boolean;
  emailMsg: boolean;
  pushMsg: boolean;
  flags: number;
  codes?: string[];
  messages?: string[];
}

export interface GetMobileResponse {
  mobile: string;
  token: string;
}

export interface GetMobilePasscodeResponse {
  key: string;
  passcode: string;
}

export interface VerifiedUserResponse {
  id?: string;
  email?: string;
  fname?: string;
  lname?: string;
  idpass?: boolean;
  createdAt?: number;
  updatedAt?: number;
  smsMsg?: boolean;
  emailMsg?: boolean;
  pushMsg?: boolean;
  flags?: number;
  code?: number;
  codes?: string[];
}

export interface VantageScoreResponse {
  vantageScore: VantageScore;
}

export interface VantageScore {
  providerViews?: ProviderViewsEntity[] | null;
  id: string;
  scoreType: string;
  scoreModel: string;
  generatedDate: string;
}

export interface ProviderViewsEntity {
  provider: string;
  score: number;
  scoreRanges?: ScoreRangesEntityOrLoanRiskRangesEntity[] | null;
  loanRiskRanges?: ScoreRangesEntityOrLoanRiskRangesEntity[] | null;
  scoreReasons?: ScoreReasonsEntity[] | null;
}

export interface ScoreRangesEntityOrLoanRiskRangesEntity {
  low: number;
  high: number;
  name: string;
}

export interface ScoreReasonsEntity {
  code: string;
  description: string;
  creditScoreFactorEffect: string;
}

export interface GetQuizResponse {
  key?: string;
  id?: number;
  questions?: QuestionsEntity[] | null;
}

export interface GetQuizSection {
  key: string;
  id: number;
  questions?: QuizSectionData[] | null;
}

export interface QuizSectionData {
  id: number;
  text: string;
  data: AnswersEntity[] | null | undefined;
}

export interface AnswerQuestions {
  qid: number;
  aid: number;
}

export interface QuestionsEntity {
  id: number;
  text: string;
  answers?: AnswersEntity[] | null;
}

export interface AnswersEntity {
  id: number;
  text: string;
  correct: boolean;
}

export interface AnswerQuestionGroup {
  aid: number;
  qid: number;
}

export interface Inputs {
  title?: string;
  inputFormat?: InputFormat;
  validationRules?: ValidationRule[];
  isTouchable?: boolean;
  mask?: string;
  type: InputType;
  key?: string;
  value?: string;
  placeholder?: string;
  errorStrings?: string[];
  prefixImage?: string;
  prefixText?: string;
  dateFormat?: string;
  autoCapitalize?: string;
}

export interface GetCRSUserDetailsResponse {
  user_details: UserDetails;
}

export interface UserDetails {
  pre_auth_token: PreAuthToken;
  ownit_guid: string;
  crs_userid: string;
}

export interface FormValue {
  value?: any;
  key: string;
  isValid?: boolean;
}

export interface MXAccount {
  ow_guid?: string;
  is_preferred?: boolean;
  guid?: string;
  name?: string;
  type?: string;
  account_number?: string;
  institution_code?: string;
  institution_name?: string;
  member_guid?: string;
  link_status?: string;
}

export interface MXAccountsSection {
  title: string;
  types: string[];
  accounts: MXAccount[];
}

export interface CRSManualCreditScoreResponse {
  user_provided_score: CRSManualCreditScore;
}

export interface CRSManualCreditScore {
  min_credit_score: number;
  max_credit_score: number;
}

export interface VantageScoreResponse {
  providerViews: ProviderView[];
  id: string;
  scoreType: string;
  scoreModel: string;
  generatedDate: number;
}

export interface ProviderView {
  provider: string;
  score: number;
  scoreRanges: ScoreRange[];
  loanRiskRanges: LoanRiskRange[];
  scoreReasons: ScoreReason[];
}

export interface ScoreRange {
  low: number;
  high: number;
  name: string;
}

export interface LoanRiskRange {
  low: number;
  high: number;
  name: string;
}

export interface ScoreReason {
  code: string;
  description: string;
  creditScoreFactorEffect: string;
}

export interface PoliciesResponse {
  policies: Policy[];
}

export interface Policy {
  policy_id: string;
  ip_address?: string;
  accepted?: boolean;
  policy_title?: string;
  policy?: string;
  version_id?: number;
  version_no?: number;
}
