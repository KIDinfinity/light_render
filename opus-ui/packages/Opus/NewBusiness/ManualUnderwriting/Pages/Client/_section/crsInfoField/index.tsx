import React from 'react';
import useGetSectionConfigWithRole from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import Newcrs, { fieldConfig as newCrsConfig } from './Fields/Newcrs';
import FormSection from '../../_component/FormSection';
import lodash from 'lodash';
import { ReactComponent as CrsIcon } from 'opus/Assets/crsIcon.svg';

const localSectionConfig = {
  section: 'CrsInfo-Field',
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
  configs: [localSectionConfig, newCrsConfig],
  remote: true,
  section: localSectionConfig.section,
};

const Fields = {
  Newcrs,
};

const Crsinfofield = ({
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

  return (
    <FormSection
      form={form}
      config={config}
      readOnly={readOnly}
      icon={readOnly ? <CrsIcon /> : null}
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

export { Fields, localConfig };
export default Crsinfofield;
