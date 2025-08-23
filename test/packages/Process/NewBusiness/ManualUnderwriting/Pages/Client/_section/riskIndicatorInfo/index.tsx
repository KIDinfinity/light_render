import React from 'react';
import lodash from 'lodash';

import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import { ReactComponent as WarningIcon } from 'process/assets/warning.svg';

import FormSection from '../../_component/FormSection';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
  section: localSectionConfig.section,
};

const BusinessSection = ({
  form,
  editable,
  clientId,
  readOnly = true,
  spanMode,
  layoutName,
  condition,
}: any) => {
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    clientId,
    condition,
  });

  console.log('🚀 ~ config:', config, localConfig);
  return (
    <FormSection
      form={form}
      config={config}
      readOnly={readOnly}
      icon={<WarningIcon />}
      spanMode={spanMode}
      layoutName={layoutName}
      clientId={clientId}
      formId={`${localSectionConfig.section}-${clientId}`}
    >
      {lodash.map(Fields, (field) =>
        React.createElement(field, {
          form,
          editable,
          section: localSectionConfig.section,
          id: clientId,
          key: field.displayName,
          readOnly,
        })
      )}
    </FormSection>
  );
};

const Section = ({
  form,
  editable,
  clientId,
  readOnly = true,
  spanMode,
  layoutName,
  children,
}: any) => {
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    clientId,
  });

  console.log('🚀 ~ config section:', config);
  return (
    <FormSection
      form={form}
      config={config}
      readOnly={readOnly}
      icon="user"
      spanMode={spanMode}
      clientId={clientId}
      layoutName={layoutName}
      formId={`${localSectionConfig.section}-${clientId}`}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          form,
          editable,
          section: localSectionConfig.section,
          id: clientId,
          readOnly,
        })
      )}
    </FormSection>
  );
};

export { Fields, localConfig, FieldConfigs, Section };
export default BusinessSection;
