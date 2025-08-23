import { fieldConfig as AutoRebalancingStatusConfig } from './AutoRebalancingStatus.config';
import { fieldConfig as AutorebalancingtypeConfig } from './Autorebalancingtype.config';
import { fieldConfig as PortfolioidConfig } from './Portfolioid.config';
import { fieldConfig as PortfoliotypeConfig } from './Portfoliotype.config';
import { fieldConfig as UlreserveunitdateConfig } from './Ulreserveunitdate.config';
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
    AutoRebalancingStatusConfig,
    AutorebalancingtypeConfig,
    PortfolioidConfig,
    PortfoliotypeConfig,
    UlreserveunitdateConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
