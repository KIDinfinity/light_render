import PolicyType, { localFieldConfig as PolicyTypeConfig } from './PolicyType';
import PaymentAmount, { localFieldConfig as PaymentAmountConfig } from './PaymentAmount';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';

export const localFieldConfigs = [PolicyTypeConfig, PaymentAmountConfig, PolicyNoConfig];

export default { PolicyType, PaymentAmount, PolicyNo };
