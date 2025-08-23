import React from 'react';
import lodash from 'lodash';
import useGetOrderInfoFieldConfigFilterCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetOrderInfoFieldConfigFilterCallback';
import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import { ReactComponent as OtherIcon } from 'process/assets/other.svg';

import FormSection from '../../_component/FormSection';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

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
  const filterByChannel = useGetOrderInfoFieldConfigFilterCallback();
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    clientId,
    condition,
  });

  const filterByChannelConfig = filterByChannel(config);

  return (
    <FormSection
      form={form}
      config={filterByChannelConfig}
      readOnly={readOnly}
      icon={<OtherIcon />}
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

export { Fields, localConfig, FieldConfigs };
export default BusinessSection;
