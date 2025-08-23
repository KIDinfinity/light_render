import AccountValue, { localFieldConfig as AccountValueConfig } from './AccountValue';
import FundCode, { localFieldConfig as FundCodeConfig } from './FundCode';
import UnitHolding, { localFieldConfig as UnitHoldingConfig } from './UnitHolding';
import PremiumType, { localFieldConfig as PremiumTypeConfig } from './PremiumType';
import WithdrawalAmt, { localFieldConfig as WithdrawalAmtConfig } from './WithdrawalAmt';
import WithdrawalOpt, { localFieldConfig as WithdrawalOptConfig } from './WithdrawalOpt';
import WithdrawalPct, { localFieldConfig as WithdrawalPctConfig } from './WithdrawalPct';
import WithdrawalUnit, { localFieldConfig as WithdrawalUnitConfig } from './WithdrawalUnit';
import TotalAmount, { localFieldConfig as TotalAmountConfig } from './TotalAmount';
import BaseUnit, { localFieldConfig as BaseUnitConfig } from './BaseUnit';
import TopUpUnit, { localFieldConfig as TopUpUnitConfig } from './TopUpUnit';
import FundChargeAmt, { localFieldConfig as FundChargeAmtConfig } from './FundChargeAmt';
import NetAmount, { localFieldConfig as NetAmountConfig } from './NetAmount';
import TotalAccountValue, {
  localFieldConfig as TotalAccountValueConfig,
} from './TotalAccountValue';
import TotalSurrenderCharge, {
  localFieldConfig as TotalSurrenderChargeConfig,
} from './TotalSurrenderCharge';
import WriteWithdrawalAmt, {
  localFieldConfig as WriteWithdrawalAmtConfig,
} from './WriteWithdrawalAmt';
import UnitPrice, { localFieldConfig as UnitPriceConfig } from './UnitPrice';
import Currency, { localFieldConfig as CurrencyConfig } from './Currency';
import WithdrawalLevel, { localFieldConfig as WithdrawalLevelConfig } from './WithdrawalLevel';
import RequestTotalAmount, {
  localFieldConfig as RequestTotalAmountConfig,
} from './RequestTotalAmount';
import RequestTotalPerc, { localFieldConfig as RequestTotalPercConfig } from './RequestTotalPerc';

export const localFieldConfigs = [
  AccountValueConfig,
  FundCodeConfig,
  UnitHoldingConfig,
  PremiumTypeConfig,
  WithdrawalAmtConfig,
  WithdrawalOptConfig,
  WithdrawalPctConfig,
  WithdrawalUnitConfig,
  TotalAmountConfig,
  BaseUnitConfig,
  TopUpUnitConfig,
  FundChargeAmtConfig,
  NetAmountConfig,
  TotalAccountValueConfig,
  TotalSurrenderChargeConfig,
  WriteWithdrawalAmtConfig,
  UnitPriceConfig,
  CurrencyConfig,
  WithdrawalLevelConfig,
  RequestTotalAmountConfig,
  RequestTotalPercConfig,
];

export default {
  AccountValue,
  FundCode,
  UnitHolding,
  PremiumType,
  WithdrawalAmt,
  WithdrawalOpt,
  WithdrawalPct,
  WithdrawalUnit,
  TotalAmount,
  BaseUnit,
  TopUpUnit,
  FundChargeAmt,
  NetAmount,
  TotalAccountValue,
  TotalSurrenderCharge,
  WriteWithdrawalAmt,
  UnitPrice,
  Currency,
  WithdrawalLevel,
  RequestTotalAmount,
  RequestTotalPerc,
};
