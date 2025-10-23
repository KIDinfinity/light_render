import { localConfig as insuredSectionConfig } from './Modules/Insured/Section';

const NAMESPACE = 'opusClaimAssessment';

export default {
  configs: [...insuredSectionConfig.configs],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true,
};
export { NAMESPACE };
