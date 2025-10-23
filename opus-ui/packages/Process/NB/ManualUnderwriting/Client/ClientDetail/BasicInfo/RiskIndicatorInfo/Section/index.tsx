import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Pepflag, { fieldConfig as pepFlagConfig } from './Fields/Pepflag';

import Pepassoicateflag, { fieldConfig as pepAssoicateFlagConfig } from './Fields/Pepassoicateflag';

import Titleofpep, { fieldConfig as titleOfPepConfig } from './Fields/Titleofpep';

import Relationshiptopep, {
  fieldConfig as relationshipToPepConfig,
} from './Fields/Relationshiptopep';

import Bankruptcy, { fieldConfig as bankruptcyConfig } from './Fields/Bankruptcy';

import Bankruptcydate, { fieldConfig as bankruptcyDateConfig } from './Fields/Bankruptcydate';

import FatcaDropdownValue, {
  fieldConfig as fatcaDropdownValueConfig,
} from './Fields/FatcaDropdownValue';

import Fatcadate, { fieldConfig as fatcadateConfig } from './Fields/Fatcadate';

import Kyc, { fieldConfig as kycConfig } from './Fields/Kyc';

const localSectionConfig = {
  section: 'RiskIndicatorInfo',
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

    pepFlagConfig,

    pepAssoicateFlagConfig,

    titleOfPepConfig,

    relationshipToPepConfig,

    bankruptcyConfig,

    bankruptcyDateConfig,

    fatcaDropdownValueConfig,

    fatcadateConfig,

    kycConfig,
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

const Riskindicatorinfo = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'RiskIndicatorInfo',
    localConfig,
  });
  return (
    <Section section="RiskIndicatorInfo" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'RiskIndicatorInfo' })
      )}
    </Section>
  );
};

const Fields = {
  Pepflag,

  Pepassoicateflag,

  Titleofpep,

  Relationshiptopep,

  Bankruptcy,

  Bankruptcydate,

  FatcaDropdownValue,

  Fatcadate,

  Kyc,
};

export { Fields, localConfig };
export default Riskindicatorinfo;
