import { fieldConfig as ClientnameConfig } from './Clientname.config';
import { fieldConfig as InsurancecompanynameConfig } from './Insurancecompanyname.config';
import { fieldConfig as InsurernameConfig } from './Insurername.config';
import { fieldConfig as OtherpolicytypeConfig } from './Otherpolicytype.config';
import { fieldConfig as OtherreasonConfig } from './Otherreason.config';
import { fieldConfig as PlannameConfig } from './Planname.config';
import { fieldConfig as PolicynoConfig } from './Policyno.config';
import { fieldConfig as PolicytypeConfig } from './Policytype.config';
import { fieldConfig as ReasonforpolicyreplacementConfig } from './Reasonforpolicyreplacement.config';
import { fieldConfig as SumassuredConfig } from './Sumassured.config';

const localSectionConfig = {
  section: 'PolicyReplacement-Table',
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
    ClientnameConfig,
    InsurancecompanynameConfig,
    InsurernameConfig,
    OtherpolicytypeConfig,
    OtherreasonConfig,
    PlannameConfig,
    PolicynoConfig,
    PolicytypeConfig,
    ReasonforpolicyreplacementConfig,
    SumassuredConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
