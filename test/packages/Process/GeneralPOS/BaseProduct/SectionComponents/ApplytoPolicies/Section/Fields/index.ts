import ContactAddr, { localFieldConfig as ContactAddrConfig } from './ContactAddr';
import InsuredName, { localFieldConfig as InsuredNameConfig } from './InsuredName';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import PolicyType, { localFieldConfig as PolicyTypeConfig } from './PolicyType';
import PolicySelection, { localFieldConfig as PolicySelectionConfig } from './PolicySelection';
import RiskStatus, { localFieldConfig as RiskStatusConfig } from './RiskStatus';

export const whiteList = [
  InsuredNameConfig,
  PolicyNoConfig,
  PolicyTypeConfig,
  PolicySelectionConfig,
  RiskStatusConfig,
];

export const localFieldConfigs = [
  ContactAddrConfig,
  InsuredNameConfig,
  PolicyNoConfig,
  PolicyTypeConfig,
  PolicySelectionConfig,
  RiskStatusConfig,
];

export default {
  ContactAddr,
  InsuredName,
  PolicyNo,
  PolicyType,
  PolicySelection,
  RiskStatus,
};
