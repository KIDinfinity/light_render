import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import CurrencyCode, { fieldConfig as currencyCodeConfig } from './Fields/Currency';
import Code, { fieldConfig as exclusionCodeConfig } from './Fields/ExclusionCode';
import PolicyLevelDecision, {
  fieldConfig as policyLevelDecisionConfig,
} from './Fields/PolicyLevelDecision';
import PostponeLongDescription, {
  fieldConfig as postponeLongDescriptionConfig,
} from './Fields/PostponeLongDescription';
import PostponeShortName, {
  fieldConfig as postponeShortNameConfig,
} from './Fields/PostponeShortName';
import Reason, { fieldConfig as reasonConfig } from './Fields/Reason';
import UWDecisionDescription, {
  fieldConfig as uwDecisionDescriptionConfig,
} from './Fields/UWDecisionDescription';
import Postponeperiod, { fieldConfig as postponePeriodConfig } from './Fields/Postponeperiod';
import Postponeperiodunit, {
  fieldConfig as postponePeriodUnitConfig,
} from './Fields/Postponeperiodunit';
import UWMEReason, { fieldConfig as UWMEReasonConfig } from './Fields/UWMEReason';
import PostponeRemark, { fieldConfig as PostponeRemarkConfig } from './Fields/PostponeRemark';
import Mibdecisioncode, { fieldConfig as mibDecisionCodeConfig } from './Fields/Mibdecisioncode';

const localSectionConfig = {
  section: 'UWDecision',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
      xxl: {
        span: 24,
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
    policyLevelDecisionConfig,
    reasonConfig,
    postponeShortNameConfig,
    postponeLongDescriptionConfig,
    exclusionCodeConfig,
    currencyCodeConfig,
    uwDecisionDescriptionConfig,
    postponePeriodConfig,
    postponePeriodUnitConfig,
    UWMEReasonConfig,
    PostponeRemarkConfig,
    mibDecisionCodeConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const UWDecision = ({ form, editable, children }: any) => (
  <Section section="UWDecision" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'UWDecision' })
    )}
  </Section>
);
const Fields = {
  UWMEReason,
  PolicyLevelDecision,
  Reason,
  PostponeShortName,
  PostponeLongDescription,
  Code,
  CurrencyCode,
  UWDecisionDescription,
  Postponeperiod,
  Postponeperiodunit,
  PostponeRemark,
  Mibdecisioncode,
};

export { Fields, localConfig };
export default UWDecision;
