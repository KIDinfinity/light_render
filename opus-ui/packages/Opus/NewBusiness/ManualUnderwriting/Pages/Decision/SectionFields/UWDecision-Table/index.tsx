import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Uptoage, { fieldConfig as upToAgeConfig } from './Fields/Uptoage';
import Clientid, { fieldConfig as clientIdConfig } from './Fields/Clientid';
import Currencycode, { fieldConfig as currencyCodeConfig } from './Fields/Currencycode';
import Discount, { fieldConfig as discountConfig } from './Fields/Discount';
import Numberofunits, { fieldConfig as numberOfUnitsConfig } from './Fields/Numberofunits';
import Discountcode, { fieldConfig as discountCodeConfig } from './Fields/Discountcode';
import Indemnifyperiod, { fieldConfig as indemnifyPeriodConfig } from './Fields/Indemnifyperiod';
import Basepremium, { fieldConfig as basePremiumConfig } from './Fields/Basepremium';
import Annualprem, { fieldConfig as annualpremConfig } from './Fields/Annualprem';
import Payperiod, { fieldConfig as payPeriodConfig } from './Fields/Payperiod';
import Corecode, { fieldConfig as coreCodeConfig } from './Fields/Corecode';
import Sumassured, { fieldConfig as sumAssuredConfig } from './Fields/Sumassured';
import Riskage, { fieldConfig as riskAgeConfig } from './Fields/Riskage';
import Premcessage, { fieldConfig as premCessAgeConfig } from './Fields/Premcessage';
import WaiverProduct, { fieldConfig as waiverProductConfig } from './Fields/Waiverproduct';
import FinalCOI, { fieldConfig as finalCOIConfig } from './Fields/FinalCOI';
import GuaranteedMonthlyPayout, {
  fieldConfig as guaranteedMonthlyPayoutConfig,
} from './Fields/GuaranteedMonthlyPayout';
import ReturnOfPremium, { fieldConfig as returnOfPremiumConfig } from './Fields/ReturnOfPremium';
import SumAssuredMultiplier, {
  fieldConfig as sumAssuredMultiplierConfig,
} from './Fields/SumAssuredMultiplier';
import LAsharingGroupNumber, {
  fieldConfig as lAsharingGroupNumberConfig,
} from './Fields/LAsharingGroupNumber';
import Initialinvestmentannualpremium, {
  fieldConfig as initialInvestmentAnnualPremiumConfig,
} from './Fields/Initialinvestmentannualpremium';
import FacultativePackageCode, {
  fieldConfig as facultativePackageCodeConfig,
} from './Fields/FacultativePackageCode';
import FacultativeReason, {
  fieldConfig as facultativeReasonConfig,
} from './Fields/FacultativeReason';

const localSectionConfig = {
  section: 'UWDecision-Table',
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
      }, // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
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
    upToAgeConfig,
    clientIdConfig,
    currencyCodeConfig,
    discountConfig,
    discountCodeConfig,
    indemnifyPeriodConfig,
    basePremiumConfig,
    payPeriodConfig,
    coreCodeConfig,
    sumAssuredConfig,
    riskAgeConfig,
    premCessAgeConfig,
    numberOfUnitsConfig,
    annualpremConfig,
    waiverProductConfig,
    finalCOIConfig,
    guaranteedMonthlyPayoutConfig,
    returnOfPremiumConfig,
    sumAssuredMultiplierConfig,
    lAsharingGroupNumberConfig,
    initialInvestmentAnnualPremiumConfig,
    facultativePackageCodeConfig,
    facultativeReasonConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children, layoutName, showOnly = 'false' }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout showOnly={showOnly} config={config} layoutName={layoutName}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const UWDecisionTableSection = ({
  form,
  editable,
  children,
  layoutName,
  showOnly = 'false',
}: any) => (
  <Section section="UWDecision-Table" form={form} layoutName={layoutName} showOnly={showOnly}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'UWDecision-Table' })
    )}
  </Section>
);

const Fields = {
  Uptoage,
  Clientid,
  Currencycode,
  Discount,
  Discountcode,
  Indemnifyperiod,
  Basepremium,
  Annualprem,
  Payperiod,
  Corecode,
  Sumassured,
  Riskage,
  Premcessage,
  Numberofunits,
  WaiverProduct,
  FinalCOI,
  GuaranteedMonthlyPayout,
  ReturnOfPremium,
  SumAssuredMultiplier,
  LAsharingGroupNumber,
  Initialinvestmentannualpremium,
  FacultativePackageCode,
  FacultativeReason,
};

export { Fields, localConfig, Section };
export default UWDecisionTableSection;
