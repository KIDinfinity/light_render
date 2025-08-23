import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Promotionsby, { fieldConfig as promotionsByConfig } from './Fields/Promotionsby';
import Agreement, { fieldConfig as agreementConfig } from './Fields/Agreement';
import Specify, { fieldConfig as specifyConfig } from './Fields/Specify';
import PassionSurvey, { fieldConfig as passionSurveyConfig } from './Fields/PassionSurvey';
import OtherPassionSurvey, {
  fieldConfig as otherPassionSurveyConfig,
} from './Fields/OtherPassionSurvey';
import Consentprocessing, {
  fieldConfig as consentProcessingConfig,
} from './Fields/Consentprocessing';
import Rbascore, { fieldConfig as RbascoreConfig } from './Fields/Rbascore';
import Vulnerablecustomertag, {
  fieldConfig as vulnerableCustomerTagConfig,
} from './Fields/Vulnerablecustomertag';
import FacialVerificationFlag, {
  fieldConfig as FacialVerificationFlagConfig,
} from './Fields/FacialVerificationFlag';

import Vulnerablecustomeroption, {
  fieldConfig as vulnerableCustomerOptionConfig,
} from './Fields/Vulnerablecustomeroption';

import Mibcodelist, { fieldConfig as mibCodeListConfig } from './Fields/Mibcodelist';

import OCRFlag, { fieldConfig as OCRFlagConfig } from './Fields/OCRFlag';

import Legalrepresentativeid, {
  fieldConfig as LegalRepresentativeIdConfig,
} from './Fields/Legalrepresentativeid';
import Currentmibcode, { fieldConfig as currentMibCodeConfig } from './Fields/Currentmibcode';

import NumberOfOtherCompany, {
  fieldConfig as NumberOfOtherCompanyConfig,
} from './Fields/NumberOfOtherCompany';
import OtherContract, { fieldConfig as OtherContractConfig } from './Fields/OtherContract';
import NumberOfPoliciesORClaimsInOtherComp, {
  fieldConfig as NumberOfPoliciesORClaimsInOtherCompConfig,
} from './Fields/NumberOfPoliciesORClaimsInOtherComp';

const localSectionConfig = {
  section: 'OtherInfo-Field',
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
    promotionsByConfig,
    agreementConfig,
    consentProcessingConfig,
    specifyConfig,
    passionSurveyConfig,
    otherPassionSurveyConfig,
    RbascoreConfig,
    vulnerableCustomerTagConfig,
    FacialVerificationFlagConfig,
    vulnerableCustomerOptionConfig,
    mibCodeListConfig,
    OCRFlagConfig,
    LegalRepresentativeIdConfig,
    currentMibCodeConfig,
    NumberOfOtherCompanyConfig,
    OtherContractConfig,
    NumberOfPoliciesORClaimsInOtherCompConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Otherinfofield = ({ form, editable, children }: any) => {
  return (
    <Section section="OtherInfo-Field" form={form}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'OtherInfo-Field' })
      )}
    </Section>
  );
};

const Fields = {
  Promotionsby,
  Agreement,
  Consentprocessing,
  Specify,
  PassionSurvey,
  OtherPassionSurvey,
  Rbascore,
  Vulnerablecustomertag,
  FacialVerificationFlag,
  Vulnerablecustomeroption,
  Mibcodelist,
  OCRFlag,
  Legalrepresentativeid,
  Currentmibcode,
  NumberOfOtherCompany,
  OtherContract,
  NumberOfPoliciesORClaimsInOtherComp,
};

export { Fields, localConfig };
export default Otherinfofield;
