import { localConfig as incidentLocalConfig } from './Incident/Section';
import { localConfig as insuredLocalConfig } from './Insured/Section';
import { localConfig as claimantLocalConfig } from './Claimant/Section';
import { localConfig as serviceAgentLocalConfig } from './ServiceAgent/Section';

const NAMESPACE = 'JPCLMOfClaimAssessment';

const claimResultLocalConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'claimResult',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

const claimHandleLocalConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'claimHandle',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export default {
  configs: [
    ...claimantLocalConfig.configs,
    ...incidentLocalConfig.configs,
    ...insuredLocalConfig.configs,
    ...serviceAgentLocalConfig.configs,
    claimResultLocalConfig,
    claimHandleLocalConfig,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true,
};
export { NAMESPACE };
