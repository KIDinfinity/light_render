import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import InsuredName, { localFieldConfig as InsuredNameConfig } from './InsuredName';
import HostClaimNo, { localFieldConfig as HostClaimNoConfig } from './HostClaimNo';
import OpusCaseNo, { localFieldConfig as OpusCaseNoConfig } from './OpusCaseNo';
import OpusBusinessNo, { localFieldConfig as OpusBusinessNoConfig } from './OpusBusinessNo';

export const localFieldConfigs = [
  PolicyNoConfig,
  InsuredNameConfig,
  HostClaimNoConfig,
  OpusBusinessNoConfig,
  OpusCaseNoConfig,
];

export default {
  PolicyNo,
  InsuredName,
  HostClaimNo,
  OpusBusinessNo,
  OpusCaseNo,
};
