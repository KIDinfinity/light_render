import React from 'react';
import lodash from 'lodash';

import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';

import FormSection from '../../_component/FormSection';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  section: 'ContactInfo-Table',
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
  children,
  clientId,
  readOnly = true,
  spanMode,
  layoutName,
  contactId,
}: any) => {
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    clientId,
  });

  return (
    <FormSection
      form={form}
      config={config}
      readOnly={readOnly}
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
          contactId,
          readOnly
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
  condition,
  contactId,
  itemTable,
  actionComponent
}: any) => {
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    condition,
    clientId
  });

  return (
    <FormSection
      form={form}
      config={config}
      readOnly={readOnly}
      icon=""
      spanMode={spanMode}
      layoutName={layoutName}
      formId={`${localSectionConfig.section}-${clientId}`}
      itemTable={itemTable}
      clientId={clientId}
      actionComponent={actionComponent}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          form,
          editable,
          section: localSectionConfig.section,
          id: clientId,
          contactId,
          readOnly
        })
      )}
    </FormSection>
  );
}

export { Fields, localConfig, FieldConfigs, Section };
export default BusinessSection;
