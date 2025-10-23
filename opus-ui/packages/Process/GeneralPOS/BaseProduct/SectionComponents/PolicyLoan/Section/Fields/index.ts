import ContractSurrenderValue, {
  localFieldConfig as ContractSurrenderValueConfig,
} from './ContractSurrenderValue';
import CounterpatiesFee, { localFieldConfig as CounterpatiesFeeConfig } from './CounterpatiesFee';
import CurrentLoanAmount, {
  localFieldConfig as CurrentLoanAmountConfig,
} from './CurrentLoanAmount';
import DuePremiumAmount, { localFieldConfig as DuePremiumAmountConfig } from './DuePremiumAmount';
import FastLoanIndicator, {
  localFieldConfig as FastLoanIndicatorConfig,
} from './FastLoanIndicator';
import LoanAllowPerc, { localFieldConfig as LoanAllowPercConfig } from './LoanAllowPerc';
import LoanAmountAvailable, {
  localFieldConfig as LoanAmountAvailableConfig,
} from './LoanAmountAvailable';
import LoanAmountRequired, {
  localFieldConfig as LoanAmountRequiredConfig,
} from './LoanAmountRequired';
import LoanDutyStamp, { localFieldConfig as LoanDutyStampConfig } from './LoanDutyStamp';
import LoanRequest, { localFieldConfig as LoanRequestConfig } from './LoanRequest';
import LoanRequestAmount, {
  localFieldConfig as LoanRequestAmountConfig,
} from './LoanRequestAmount';
import NetCV, { localFieldConfig as NetCVConfig } from './NetCV';
import NetLoanAmountPaid, {
  localFieldConfig as NetLoanAmountPaidConfig,
} from './NetLoanAmountPaid';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import EffectiveDate, { localFieldConfig as EffectiveDateConfig } from './EffectiveDate';

export const localFieldConfigs = [
  ContractSurrenderValueConfig,
  CurrentLoanAmountConfig,
  DuePremiumAmountConfig,
  FastLoanIndicatorConfig,
  LoanAllowPercConfig,
  LoanAmountRequiredConfig,
  LoanDutyStampConfig,
  LoanRequestConfig,
  LoanRequestAmountConfig,
  NetLoanAmountPaidConfig,
  NetCVConfig,
  CounterpatiesFeeConfig,
  LoanAmountAvailableConfig,
  PayableAmountConfig,
  EffectiveDateConfig,
];

export default {
  ContractSurrenderValue,
  CurrentLoanAmount,
  DuePremiumAmount,
  FastLoanIndicator,
  LoanAllowPerc,
  LoanAmountRequired,
  LoanDutyStamp,
  LoanRequest,
  LoanRequestAmount,
  NetLoanAmountPaid,
  NetCV,
  CounterpatiesFee,
  LoanAmountAvailable,
  PayableAmount,
  EffectiveDate,
};
