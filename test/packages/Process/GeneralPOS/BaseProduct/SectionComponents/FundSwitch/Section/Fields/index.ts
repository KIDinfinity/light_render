import AcknowledgedFXFunds, {
  localFieldConfig as AcknowledgedFXFundsConfig,
} from './AcknowledgedFXFunds';
import FundCode, { localFieldConfig as FundCodeConfig } from './FundCode';
import AcknowledgedNonrecommendedFunds, {
  localFieldConfig as AcknowledgedNonrecommendedFundsConfig,
} from './AcknowledgedNonrecommendedFunds';
import UnitHolding, { localFieldConfig as UnitHoldingConfig } from './UnitHolding';
import ExceedRiskToleranceLevel, {
  localFieldConfig as ExceedRiskToleranceLevelConfig,
} from './ExceedRiskToleranceLevel';
// import AllocatePct, { localFieldConfig as AllocatePctConfig } from './AllocatePct';
import FxFormDate, { localFieldConfig as FxFormDateConfig } from './FxFormDate';
import SwitchInPerc, { localFieldConfig as SwitchInPercConfig } from './SwitchInPerc';
import SwitchingOutOption, {
  localFieldConfig as SwitchingOutOptionConfig,
} from './SwitchingOutOption';
import SwitchOutPerc, { localFieldConfig as SwitchOutPercConfig } from './SwitchOutPerc';
import SwitchOutAmount, { localFieldConfig as SwitchOutAmountConfig } from './SwitchOutAmount';
import SwitchOutUnit, { localFieldConfig as SwitchOutUnitConfig } from './SwitchOutUnit';
import AllocationPercentage, {
  localFieldConfig as AllocationPercentageConfig,
} from './AllocationPercentage';
import Total, { localFieldConfig as TotalConfig } from './Total';

export const localFieldConfigs = [
  AcknowledgedFXFundsConfig,
  FundCodeConfig,
  UnitHoldingConfig,
  ExceedRiskToleranceLevelConfig,
  AllocationPercentageConfig,
  // AllocatePctConfig,
  FxFormDateConfig,
  SwitchInPercConfig,
  SwitchingOutOptionConfig,
  SwitchOutPercConfig,
  SwitchOutAmountConfig,
  SwitchOutUnitConfig,
  AcknowledgedNonrecommendedFundsConfig,
  TotalConfig,
];

export default {
  AcknowledgedFXFunds,
  FundCode,
  AcknowledgedNonrecommendedFunds,
  UnitHolding,
  ExceedRiskToleranceLevel,
  // AllocatePct,
  FxFormDate,
  SwitchInPerc,
  SwitchingOutOption,
  SwitchOutPerc,
  SwitchOutAmount,
  SwitchOutUnit,
  AllocationPercentage,
  Total,
};
