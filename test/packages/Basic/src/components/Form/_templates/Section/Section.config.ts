import { localFieldConfig as formItemInput } from './Fields/FormItemInput';

export default {
  configs: [formItemInput],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};
