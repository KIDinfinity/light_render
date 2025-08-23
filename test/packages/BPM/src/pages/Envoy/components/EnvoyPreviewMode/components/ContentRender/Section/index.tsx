import React from 'react';

import { FixedFieldLayout } from 'basic/components/Form';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PreviewClientInfo',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ChangeName',
    },
    visible: 'C',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const Section = ({ form, children, config, ...res }: any) => (
  <FixedFieldLayout form={form} config={config}>
    {React.Children.map(children, (child: any) => React.cloneElement(child, { form, ...res }))}
  </FixedFieldLayout>
);

export { Fields, localConfig, localSectionConfig };

export default Section;
