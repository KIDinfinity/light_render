import Payee, { localFieldConfig as PayeeLocalFieldConfigs } from './Payee';
import PayeeType, { localFieldConfig as PayeeTypeLocalFieldConfigs } from './PayeeType';
import PolicyAmount, { localFieldConfig as PolicyAmountLocalFieldConfigs } from './PolicyAmount';
import PolicyNo, { localFieldConfig as PolicyNoLocalFieldConfigs } from './PolicyNo';
import SharedPercentage, {
  localFieldConfig as SharedPercentageLocalFieldConfigs,
} from './SharedPercentage';

export const localFieldConfigs = [
  PayeeLocalFieldConfigs,
  PayeeTypeLocalFieldConfigs,
  PolicyAmountLocalFieldConfigs,
  PolicyNoLocalFieldConfigs,
  SharedPercentageLocalFieldConfigs,
];

export default {
  Payee,
  PayeeType,
  PolicyAmount,
  PolicyNo,
  SharedPercentage,
};
