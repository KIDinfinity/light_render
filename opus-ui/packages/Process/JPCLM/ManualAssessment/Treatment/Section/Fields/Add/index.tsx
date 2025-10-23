import PolicyNoAdd, { localFieldConfig as PolicyNoAddConfig } from './PolicyNoAdd';
import OutpatientDateAdd, {
  localFieldConfig as OutpatientDateAddAddConfig,
} from './OutpatientDateAdd';

export const localFieldConfigs = [PolicyNoAddConfig, OutpatientDateAddAddConfig];

export default {
  PolicyNoAdd,
  OutpatientDateAdd,
};
