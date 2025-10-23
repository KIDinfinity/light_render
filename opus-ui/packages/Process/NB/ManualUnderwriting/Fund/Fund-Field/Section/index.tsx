import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';

import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Autorebalancingstatus, {
  fieldConfig as autoRebalancingStatusConfig,
} from './Fields/Autorebalancingstatus';
import Autorebalancingtype, {
  fieldConfig as autoRebalancingTypeConfig,
} from './Fields/Autorebalancingtype';
import Portfoliotype, { fieldConfig as portfolioTypeConfig } from './Fields/Portfoliotype';
import Portfolioid, { fieldConfig as portfolioIdConfig } from './Fields/Portfolioid';
import Totalfundallocation, {
  fieldConfig as totalFundAllocationConfig,
} from './Fields/Totalfundallocation';
import Ulreserveunitdate, {
  fieldConfig as ulReserveUnitDateConfig,
} from './Fields/Ulreserveunitdate';

const localSectionConfig = {
  section: 'Fund-Field',
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
    portfolioTypeConfig,
    portfolioIdConfig,
    autoRebalancingTypeConfig,
    autoRebalancingStatusConfig,
    totalFundAllocationConfig,
    ulReserveUnitDateConfig,
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

const Fundfield = ({ form, editable, children }: any) => (
  <Section section="Fund-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'Fund-Field' })
    )}
  </Section>
);

const Fields = {
  Portfolioid,
  Portfoliotype,
  Autorebalancingtype,
  Autorebalancingstatus,
  Totalfundallocation,
  Ulreserveunitdate,
};

export { Fields, localConfig };
export default Fundfield;
