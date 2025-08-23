import RegenContract, { localFieldConfig as RegenContractConfig } from './RegenContract';
import ChargeFee, { localFieldConfig as ChargeFeeConfig } from './ChargeFee';
import SendTo, { localFieldConfig as SendToConfig } from './SendTo';
import TimesOfReplacement, {
  localFieldConfig as TimesOfReplacementConfig,
} from './TimesOfReplacement';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import Freeofcharge, { localFieldConfig as FreeofchargeConfig } from './Freeofcharge';
import PayinStatus, { localFieldConfig as PayinStatusConfig } from './PayinStatus';
import FeeCurrency, { localFieldConfig as FeeCurrencyConfig } from './FeeCurrency';
export const localFieldConfigs = [
  RegenContractConfig,
  ChargeFeeConfig,
  SendToConfig,
  TimesOfReplacementConfig,
  BranchCodeConfig,
  FreeofchargeConfig,
  PayinStatusConfig,
  FeeCurrencyConfig
];

export default {
  RegenContract,
  ChargeFee,
  SendTo,
  TimesOfReplacement,
  BranchCode,
  Freeofcharge,
  PayinStatus,
  FeeCurrency
};
