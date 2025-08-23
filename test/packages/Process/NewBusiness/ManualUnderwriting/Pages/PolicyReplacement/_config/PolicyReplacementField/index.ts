import { fieldConfig as CommentsConfig } from './Comment.config';
import { fieldConfig as ExtensiontoexistingproductConfig } from './Extensiontoexistingproduct.config';
import { fieldConfig as InforcePolicydConfig } from './InforcePolicy.config';
import { fieldConfig as PaidbypolicyloanConfig } from './Paidbypolicyloan.config';
import { fieldConfig as PartyinfluencenConfig } from './Partyinfluence.config';
import { fieldConfig as ReinstatablePolicyeConfig } from './ReinstatablePolicy.config';
import { fieldConfig as ReplaceinforceConfig } from './Replaceinforce.config';
import { fieldConfig as ReplaceWithApplyForConfig } from './ReplaceWithApplyFor.config';
import { fieldConfig as SatisfiedexplanationConfig } from './Satisfiedexplanation.config';

const localSectionConfig = {
  section: 'PolicyReplacement-Field',
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
    CommentsConfig,
    ExtensiontoexistingproductConfig,
    PartyinfluencenConfig,
    SatisfiedexplanationConfig,

    PaidbypolicyloanConfig,
    ReplaceinforceConfig,
    InforcePolicydConfig,
    ReinstatablePolicyeConfig,
    ReplaceWithApplyForConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};
const FirstPolicyReplacementFields = [
  'paidByPolicyLoan',
  'replaceInforce',
  'inforcePolicy',
  'reinstatablePolicy',
  'replaceWithApplyFor',
];

export { localConfig, FirstPolicyReplacementFields };
export default localConfig;
