import Promotionsby, { fieldConfig as promotionsByConfig } from './Promotionsby';
import Agreement, { fieldConfig as agreementConfig } from './Agreement';
import Specify, { fieldConfig as specifyConfig } from './Specify';
import PassionSurvey, { fieldConfig as passionSurveyConfig } from './PassionSurvey';
import OtherPassionSurvey, { fieldConfig as otherPassionSurveyConfig } from './OtherPassionSurvey';
import Consentprocessing, { fieldConfig as consentProcessingConfig } from './Consentprocessing';
import Rbascore, { fieldConfig as RbascoreConfig } from './Rbascore';
import Vulnerablecustomertag, {
  fieldConfig as vulnerableCustomerTagConfig,
} from './Vulnerablecustomertag';
import Vulnerablecustomeroption, {
  fieldConfig as vulnerableCustomerOptionConfig,
} from './Vulnerablecustomeroption';
import Mibcodelist, { fieldConfig as mibCodeListConfig } from './Mibcodelist';
import OCRFlag, { fieldConfig as OCRFlagConfig } from './OCRFlag';

import Legalrepresentativeid, {
  fieldConfig as LegalRepresentativeIdConfig,
} from './Legalrepresentativeid';

import OtherContract, { fieldConfig as OtherContractConfig } from './OtherContract';

import NumberOfOtherCompany, {
  fieldConfig as NumberOfOtherCompanyConfig,
} from './NumberOfOtherCompany';

import NumberOfPoliciesORClaimsInOtherComp, {
  fieldConfig as NumberOfPoliciesORClaimsInOtherCompConfig,
} from './NumberOfPoliciesORClaimsInOtherComp';

import CurrentmibcodeList, { fieldConfig as currentMibCodeListConfig } from './CurrentmibcodeList';

import IsInterestMhit, { fieldConfig as IsInterestMhitConfig } from './IsInterestMhit';

import OCRRemark, { fieldConfig as OCRRemarkConfig } from './OCRRemark';

import OCRResultFields, { fieldConfig as OCRResultFieldsConfig } from './OCRResultFields';
import SourceOfFundList, { fieldConfig as SourceOfFundFieldsConfig } from './SourceOfFund';
import SourceofWealthList, { fieldConfig as SourceofWealthFieldsConfig } from './SourceofWealth';
import FacialVerificationFlag, {
  fieldConfig as FacialVerificationFlagConfig,
} from './FacialVerificationFlag';
import VIPService, { fieldConfig as VIPServiceConfig } from './VIPService';

export const localFieldConfigs = [
  promotionsByConfig,
  agreementConfig,
  consentProcessingConfig,
  specifyConfig,
  passionSurveyConfig,
  otherPassionSurveyConfig,
  RbascoreConfig,
  vulnerableCustomerTagConfig,
  vulnerableCustomerOptionConfig,
  mibCodeListConfig,
  OCRFlagConfig,
  LegalRepresentativeIdConfig,
  OtherContractConfig,
  NumberOfOtherCompanyConfig,
  NumberOfPoliciesORClaimsInOtherCompConfig,
  currentMibCodeListConfig,
  IsInterestMhitConfig,
  OCRRemarkConfig,
  OCRResultFieldsConfig,
  SourceOfFundFieldsConfig,
  SourceofWealthFieldsConfig,
  FacialVerificationFlagConfig,
  VIPServiceConfig,
];

export default {
  Promotionsby,
  Agreement,
  Consentprocessing,
  Specify,
  PassionSurvey,
  OtherPassionSurvey,
  Rbascore,
  Vulnerablecustomertag,
  Vulnerablecustomeroption,
  Mibcodelist,
  OCRFlag,
  Legalrepresentativeid,
  OtherContract,
  NumberOfOtherCompany,
  NumberOfPoliciesORClaimsInOtherComp,
  CurrentmibcodeList,
  IsInterestMhit,
  OCRRemark,
  OCRResultFields,
  SourceOfFundList,
  SourceofWealthList,
  FacialVerificationFlag,
  VIPService,
};
