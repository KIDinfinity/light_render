import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';

import { FormRegister } from 'basic/components/Form';

import FixedFieldLayout from '../../_component/FixedFieldLayout';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  section: 'CommonClientInfo-Field',
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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
  section: localSectionConfig.section,
};

const Section = ({ config, form, children, spanMode, readOnly, formId, register }: any) => {
  return (
    <FormRegister form={form} formId={formId} register={lodash.isBoolean(register) ? register : !readOnly}>
      <Form layout="vertical">
        <FixedFieldLayout config={config} spanMode={spanMode} readOnly={readOnly} >
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const BusinessSection = ({
  form,
  editable,
  children,
  clientId,
  readOnly,
  spanMode,
  config,
  register,
}: any) => {
  return (
    <Section
      form={form}
      config={config}
      spanMode={spanMode}
      readOnly={readOnly}
      clientId={clientId}
      formId={`${localSectionConfig.section}-${clientId}`}
      register={register}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          form,
          editable,
          section: localSectionConfig.section,
          id: clientId,
          readOnly
        })
      )}
    </Section>
  );
};

export { Fields, localConfig, FieldConfigs };
export default BusinessSection;
