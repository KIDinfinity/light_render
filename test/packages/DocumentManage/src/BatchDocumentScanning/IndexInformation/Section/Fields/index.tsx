import ClaimType, { fieldConfig as ClaimTypeConfig } from './ClaimType';
import InsuredId, { fieldConfig as InsuredIdConfig } from './InsuredId';
import InsuredName, { fieldConfig as InsuredNameConfig } from './InsuredName';
import PolicyNo, { fieldConfig as PolicyNoConfig } from './PolicyNo';
import ApplicationNo, { fieldConfig as ApplicationNoConfig } from './ApplicationNo';
import WakeUpSkipFlag, { fieldConfig as WakeUpSkipFlagConfig } from './WakeUpSkipFlag';

export const localFieldConfigs = [
  ClaimTypeConfig,
  InsuredIdConfig,
  InsuredNameConfig,
  PolicyNoConfig,
  ApplicationNoConfig,
  WakeUpSkipFlagConfig,
];

export default {
  ClaimType,
  InsuredId,
  InsuredName,
  PolicyNo,
  ApplicationNo,
  WakeUpSkipFlag,
};
