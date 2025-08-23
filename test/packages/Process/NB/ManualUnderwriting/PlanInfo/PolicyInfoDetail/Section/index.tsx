import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';

import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Policyplantype, { fieldConfig as policyPlanTypeConfig } from './Fields/Policyplantype';

import Policyplanname, { fieldConfig as policyPlanNameConfig } from './Fields/Policyplanname';

import Proposaldate, { fieldConfig as proposalDateConfig } from './Fields/Proposaldate';

import CustomerSubmitDate, {
  fieldConfig as customerSubmitDateConfig,
} from './Fields/CustomerSubmitDate';

import Policypaymode, { fieldConfig as policyPayModeConfig } from './Fields/Policypaymode';

import Policyinitialpremium, {
  fieldConfig as policyInitialPremiumConfig,
} from './Fields/Policyinitialpremium';

import Annualprem, { fieldConfig as annualPremConfig } from './Fields/Annualprem';

import Paytype, { fieldConfig as paytypeConfig } from './Fields/Paytype';

import Renewalpaytype, { fieldConfig as renewalpaytypeConfig } from './Fields/Renewalpaytype';

import Isback, { fieldConfig as isBackConfig } from './Fields/Isback';

import Applywaitingperiod, {
  fieldConfig as applywaitingperiodConfig,
} from './Fields/Applywaitingperiod';
import BeneficialOwnerFlag, {
  fieldConfig as beneficialOwnerFlagConfig,
} from './Fields/BeneficialOwnerFlag';

import BeneficialOwnerHasUsaFlag, {
  fieldConfig as beneficialOwnerHasUsaFlagConfig,
} from './Fields/BeneficialOwnerHasUsaFlag';

import Effectivedate, { fieldConfig as effectiveDateConfig } from './Fields/Effectivedate';

import Nonforfeitureoption, {
  fieldConfig as nonForfeitureOptionConfig,
} from './Fields/Nonforfeitureoption';

import Rsp, { fieldConfig as rspConfig } from './Fields/Rsp';

import Rspcharge, { fieldConfig as rspChargeConfig } from './Fields/Rspcharge';

import Campaigncode, { fieldConfig as campaignCodeConfig } from './Fields/Campaigncode';

import GIOCampaignCode, { fieldConfig as GIOCampaignCodeConfig } from './Fields/GioCampaignCode';

import Purposeofinsurance, {
  fieldConfig as purposeOfInsuranceConfig,
} from './Fields/Purposeofinsurance';

import Quotationrefno, { fieldConfig as quotationRefNoConfig } from './Fields/Quotationrefno';

import Applicationsigneddate, {
  fieldConfig as applicationSignedDateConfig,
} from './Fields/Applicationsigneddate';

import Applicationplaceofsigning, {
  fieldConfig as applicationPlaceOfSigningConfig,
} from './Fields/Applicationplaceofsigning';

import Sbcaca, { fieldConfig as sbcacaConfig } from './Fields/Sbcaca';

import BackDate, { fieldConfig as backDateConfig } from './Fields/BackDate';

import Currencycode, { fieldConfig as currencyCodeConfig } from './Fields/Currencycode';

import Sourceofpremium, { fieldConfig as sourceOfPremiumConfig } from './Fields/Sourceofpremium';

import Policydeliverymode, {
  fieldConfig as policyDeliveryModeConfig,
} from './Fields/Policydeliverymode';

import Communicationpreference, {
  fieldConfig as communicationPreferenceConfig,
} from './Fields/Communicationpreference';

import Otherpurpose, { fieldConfig as otherPurposeConfig } from './Fields/Otherpurpose';

import Remoteselling, { fieldConfig as remoteSellingConfig } from './Fields/Remoteselling';

import Rpqscore, { fieldConfig as rpqScoreConfig } from './Fields/Rpqscore';

import HaveCreditCard, { fieldConfig as HaveCreditCardConfig } from './Fields/HaveCreditCard';
import PremiumType, { fieldConfig as PremiumTypeConfig } from './Fields/PremiumType';
import SurvivalBenefitOption, {
  fieldConfig as survivalBenefitOptionConfig,
} from './Fields/Survivalbenefitoption';

import CardIssuerCountry, {
  fieldConfig as CardIssuerCountryConfig,
} from './Fields/CardIssuerCountry';

import Sourcefund, { fieldConfig as sourceFundConfig } from './Fields/Sourcefund';
import SourceFundOtherReason, {
  fieldConfig as sourceFundOtherReasonConfig,
} from './Fields/SourceFundOtherReason';
import InvestmentOption, { fieldConfig as investmentOptionConfig } from './Fields/InvestmentOption';

import Sourceofpremiumcountry, {
  fieldConfig as sourceOfPremiumCountryConfig,
} from './Fields/Sourceofpremiumcountry';

import CaseType, { fieldConfig as caseTypeConfig } from './Fields/CaseType';

import AffiliateCampaignCode, {
  fieldConfig as AffiliateCampaignCodeConfig,
} from './Fields/AffiliateCampaignCode';
import Policyaddress7, { fieldConfig as policyAddress7Config } from './Fields/Policyaddress7';

import Policyaddress6, { fieldConfig as policyAddress6Config } from './Fields/Policyaddress6';

import Policyaddress5, { fieldConfig as policyAddress5Config } from './Fields/Policyaddress5';

import Policyaddress4, { fieldConfig as policyAddress4Config } from './Fields/Policyaddress4';

import Policyaddress3, { fieldConfig as policyAddress3Config } from './Fields/Policyaddress3';

import Policyaddress2, { fieldConfig as policyAddress2Config } from './Fields/Policyaddress2';

import Policyaddress1, { fieldConfig as policyAddress1Config } from './Fields/Policyaddress1';

import Policyzipcode, { fieldConfig as policyZipCodeConfig } from './Fields/Policyzipcode';

import PolicyFullAddress, {
  fieldConfig as PolicyFullAddressConfig,
} from './Fields/PolicyFullAddress';

import Gsindicator, { fieldConfig as gsIndicatorConfig } from './Fields/Gsindicator';

import Annualizedprem, { fieldConfig as annualizedPremConfig } from './Fields/Annualizedprem';

import Basepremium, { fieldConfig as basePremiumConfig } from './Fields/Basepremium';

import Specialtaggingindicator, {
  fieldConfig as specialTaggingIndicatorConfig,
} from './Fields/Specialtaggingindicator';

import Diabetesdurationyears, {
  fieldConfig as diabetesDurationYearsConfig,
} from './Fields/Diabetesdurationyears';

import Ewithdrawalstatus, {
  fieldConfig as eWithdrawalStatusConfig,
} from './Fields/Ewithdrawalstatus';
import CustomerFactFind, { fieldConfig as customerFactFindConfig } from './Fields/CustomerFactFind';
import WithdrawalTerm, { fieldConfig as withdrawalTermConfig } from './Fields/WithdrawalTerm';
import PaymentOption, { fieldConfig as paymentOptionConfig } from './Fields/Paymentoption';

import Fecriskmsg, { fieldConfig as fecRiskMsgConfig } from './Fields/Fecriskmsg';
import FacType, { fieldConfig as FacTypeConfig } from './Fields/FacType';

import Privatefundflag, { fieldConfig as privatefundflagConfig } from './Fields/Privatefundflag';

import Rebalancingtype, { fieldConfig as rebalancingtypeConfig } from './Fields/Rebalancingtype';

import RpqExecuteDate, { fieldConfig as rpqExecuteDateConfig } from './Fields/RpqExecuteDate';

import RpqRiskLevel, { fieldConfig as rpqRiskLevelConfig } from './Fields/RpqRiskLevel';

import Refundpaytype, { fieldConfig as refundpaytypeConfig } from './Fields/Refundpaytype';

import MainPolicy, { fieldConfig as MainPolicyConfig } from './Fields/MainPolicy';

import SharingGroupNumber, {
  fieldConfig as SharingGroupNumberConfig,
} from './Fields/SharingGroupNumber';

import DocumentDeliveryMode, {
  fieldConfig as DocumentDeliveryModeConfig,
} from './Fields/DocumentDeliveryMode';

import Crossreferencenumber, {
  fieldConfig as CrossreferencenumberConfig,
} from './Fields/Crossreferencenumber';

import Advancepaymentamount, {
  fieldConfig as advancePaymentAmountConfig,
} from './Fields/Advancepaymentamount';

import Advancepaymentduration, {
  fieldConfig as advancePaymentDurationConfig,
} from './Fields/Advancepaymentduration';

import Policytaxamount, { fieldConfig as policyTaxAmountConfig } from './Fields/Policytaxamount';

import RiderNFO, { fieldConfig as riderNFOConfig } from './Fields/RiderNFO';

const localSectionConfig = {
  section: 'PlanInfo-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,

    caseTypeConfig,

    policyPlanTypeConfig,

    policyPlanNameConfig,

    proposalDateConfig,

    customerSubmitDateConfig,

    policyPayModeConfig,

    policyInitialPremiumConfig,

    annualPremConfig,

    paytypeConfig,

    renewalpaytypeConfig,

    isBackConfig,

    applywaitingperiodConfig,

    backDateConfig,

    nonForfeitureOptionConfig,

    rspConfig,

    rspChargeConfig,

    campaignCodeConfig,

    purposeOfInsuranceConfig,

    quotationRefNoConfig,

    applicationSignedDateConfig,

    applicationPlaceOfSigningConfig,

    sbcacaConfig,

    effectiveDateConfig,

    currencyCodeConfig,

    sourceOfPremiumConfig,

    policyDeliveryModeConfig,

    communicationPreferenceConfig,

    otherPurposeConfig,

    beneficialOwnerFlagConfig,

    beneficialOwnerHasUsaFlagConfig,

    remoteSellingConfig,

    rpqScoreConfig,

    HaveCreditCardConfig,

    CardIssuerCountryConfig,

    PremiumTypeConfig,

    sourceFundConfig,

    sourceOfPremiumCountryConfig,

    sourceFundOtherReasonConfig,

    investmentOptionConfig,

    survivalBenefitOptionConfig,

    GIOCampaignCodeConfig,
    AffiliateCampaignCodeConfig,

    policyAddress7Config,

    policyAddress6Config,

    policyAddress5Config,

    policyAddress4Config,

    policyAddress3Config,

    policyAddress2Config,

    policyAddress1Config,

    policyZipCodeConfig,

    PolicyFullAddressConfig,

    gsIndicatorConfig,

    annualizedPremConfig,

    eWithdrawalStatusConfig,

    specialTaggingIndicatorConfig,

    diabetesDurationYearsConfig,

    basePremiumConfig,

    customerFactFindConfig,

    withdrawalTermConfig,

    paymentOptionConfig,

    fecRiskMsgConfig,

    FacTypeConfig,

    privatefundflagConfig,

    rebalancingtypeConfig,

    rpqExecuteDateConfig,

    rpqRiskLevelConfig,

    refundpaytypeConfig,

    MainPolicyConfig,

    SharingGroupNumberConfig,

    DocumentDeliveryModeConfig,

    CrossreferencenumberConfig,

    advancePaymentAmountConfig,

    advancePaymentDurationConfig,

    policyTaxAmountConfig,

    riderNFOConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'proposal',
    });
    return configItem;
  });

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={configByDisableCondition}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Planinfofield = ({ form, editable, children }: any) => (
  <Section section="PlanInfo-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'PlanInfo-Field' })
    )}
  </Section>
);
const Fields = {
  CaseType,

  Policyplantype,

  Policyplanname,

  Proposaldate,

  CustomerSubmitDate,

  Policypaymode,

  Policyinitialpremium,

  Annualprem,

  Paytype,

  Renewalpaytype,

  Isback,

  BeneficialOwnerFlag,

  BeneficialOwnerHasUsaFlag,

  BackDate,

  Nonforfeitureoption,

  Rsp,

  Rspcharge,

  Campaigncode,

  Purposeofinsurance,

  Quotationrefno,

  Applicationsigneddate,

  Applicationplaceofsigning,

  Sbcaca,

  Effectivedate,

  Currencycode,

  Sourceofpremium,

  Policydeliverymode,

  Communicationpreference,

  Otherpurpose,

  Remoteselling,

  Rpqscore,

  HaveCreditCard,

  CardIssuerCountry,

  PremiumType,

  Sourcefund,

  Sourceofpremiumcountry,

  SourceFundOtherReason,

  InvestmentOption,

  SurvivalBenefitOption,

  GIOCampaignCode,
  AffiliateCampaignCode,

  Policyaddress7,

  Policyaddress6,

  Policyaddress5,

  Policyaddress4,

  Policyaddress3,

  Policyaddress2,

  Policyaddress1,

  Policyzipcode,

  PolicyFullAddress,

  Gsindicator,

  Annualizedprem,

  Ewithdrawalstatus,

  Specialtaggingindicator,

  Diabetesdurationyears,

  Applywaitingperiod,

  Basepremium,

  CustomerFactFind,

  WithdrawalTerm,

  PaymentOption,

  Fecriskmsg,

  FacType,

  Privatefundflag,

  Rebalancingtype,

  RpqExecuteDate,

  RpqRiskLevel,

  Refundpaytype,

  MainPolicy,

  SharingGroupNumber,

  DocumentDeliveryMode,

  Crossreferencenumber,

  Advancepaymentamount,

  Advancepaymentduration,

  Policytaxamount,

  RiderNFO,
};

export { Fields, localConfig };
export default Planinfofield;
