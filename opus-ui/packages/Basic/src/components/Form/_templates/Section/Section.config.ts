import { localFieldConfig as formItemInput } from './Fields/FormItemInput';

const sectionConfig = {
  atomGroupCode: '',
  caseCategory: '',
  activityCode: '',
  section: '',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '',
    },
    visible: 'Y',
  },
};

export default {
  configs: [formItemInput],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};
