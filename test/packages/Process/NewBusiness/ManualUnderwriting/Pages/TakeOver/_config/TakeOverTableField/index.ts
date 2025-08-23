import { fieldConfig as policyNoConfig } from './Policyno.config';

import { fieldConfig as productCodeConfig } from './Productcode.config';

import { fieldConfig as planNameConfig } from './Planname.config';

import { fieldConfig as takeoverProductTypeConfig } from './Takeoverproducttype.config';

const localSectionConfig = {
  section: 'TakeOver-Table',
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
    policyNoConfig,
    productCodeConfig,
    planNameConfig,
    takeoverProductTypeConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
