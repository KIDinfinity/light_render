import { fieldConfig as AdhocTopUpAllocationConfig } from './AdhocTopUpAllocation.config';
import { fieldConfig as EPAAllocationConfig } from './EPAAllocation.config';
import { fieldConfig as FundallocationConfig } from './Fundallocation.config';
import { fieldConfig as FundcodeConfig } from './Fundcode.config';
import { fieldConfig as FundcurrencyConfig } from './Fundcurrency.config';
import { fieldConfig as FundnameConfig } from './Fundname.config';
import { fieldConfig as TPAAllocationConfig } from './TPAAllocation.config';
import { fieldConfig as TPARCDAllocationConfig } from './TPARCDAllocation.config';
const localSectionConfig = {
  section: 'Fund-Table',
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
    AdhocTopUpAllocationConfig,
    EPAAllocationConfig,
    FundallocationConfig,
    FundcodeConfig,
    FundcurrencyConfig,
    FundnameConfig,
    TPAAllocationConfig,
    TPARCDAllocationConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
