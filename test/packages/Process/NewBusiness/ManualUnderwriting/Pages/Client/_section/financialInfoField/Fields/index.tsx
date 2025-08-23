import Annualincome, { fieldConfig as annualIncomeConfig } from './Annualincome';
import Reasonforpaying, { fieldConfig as reasonForPayingConfig } from './Reasonforpaying';
import Sourceoffund, { fieldConfig as sourceOfFundConfig } from './Sourceoffund';
import Annualincomeinlocalcurrency, {
  fieldConfig as AnnualincomeinlocalcurrencyConfig,
} from './Annualincomeinlocalcurrency';
import Othersource, { fieldConfig as otherSourceConfig } from './Othersource';
import IndisiaReason, { fieldConfig as IndisiaReasonConfig } from './IndisiaReason';
import Incomerange, { fieldConfig as incomeRangeConfig } from './Incomerange';
import usTaxFlag, { fieldConfig as usTaxFlagConfig } from './usTaxFlag';
import taxDeductionConsent, {
  fieldConfig as taxDeductionConsentConfig,
} from './taxDeductionConsent';
import MonthlyIncome, { fieldConfig as monthlyIncomeConfig } from './MonthlyIncome';
import Ctfid, { fieldConfig as ctfidConfig } from './Ctfid';
import Monthlyincomeinlocalcurrency, {
  fieldConfig as MonthlyincomeinlocalcurrencyConfig,
} from './MonthlyIncomeinlocalcurrency';
import Annulpremequivalent, {
  fieldConfig as AnnualpremqquivalentConfig,
} from './Annualpremequivalent';
import MonthlyIncomeRange, { fieldConfig as monthlyIncomeRangeConfig } from './MonthlyIncomeRange';
import tsarPH, { fieldConfig as tsarPHConfig } from './tsarPH';
import tsarPI, { fieldConfig as tsarPIConfig } from './tsarPI';
import localTinNo, { fieldConfig as localTinNoConfig } from './LocalTinNo';
import SstRegistrationNo, { fieldConfig as sstRegistrationNoConfig } from './SstRegistrationNo';

export const localFieldConfigs = [
  annualIncomeConfig,
  ctfidConfig,
  sourceOfFundConfig,
  reasonForPayingConfig,
  AnnualincomeinlocalcurrencyConfig,
  otherSourceConfig,
  IndisiaReasonConfig,
  incomeRangeConfig,
  usTaxFlagConfig,
  monthlyIncomeConfig,
  MonthlyincomeinlocalcurrencyConfig,
  AnnualpremqquivalentConfig,
  monthlyIncomeRangeConfig,
  taxDeductionConsentConfig,
  tsarPHConfig,
  tsarPIConfig,
  localTinNoConfig,
  sstRegistrationNoConfig,
];

export default {
  Ctfid,
  Annualincome,
  Sourceoffund,
  Reasonforpaying,
  Annualincomeinlocalcurrency,
  Annulpremequivalent,
  Othersource,
  IndisiaReason,
  Incomerange,
  usTaxFlag,
  MonthlyIncome,
  Monthlyincomeinlocalcurrency,
  MonthlyIncomeRange,
  taxDeductionConsent,
  tsarPH,
  tsarPI,
  localTinNo,
  SstRegistrationNo,
};
