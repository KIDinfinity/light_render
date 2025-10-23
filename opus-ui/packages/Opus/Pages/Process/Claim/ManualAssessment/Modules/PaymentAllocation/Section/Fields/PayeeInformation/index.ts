import FirstName, { fieldConfig as FirstNameLocalFieldConfig } from './FirstName';
import IsCorporation, { localFieldConfig as IsCorporationLocalFieldConfig } from './IsCorporation';
import LifeJClientNo, { fieldConfig as LifeJClientNoLocalFieldConfig } from './LifeJClientNo';
import PayeeType, { localFieldConfig as PayeeTypeLocalFieldConfig } from './PayeeType';
import PaymentMethod, { localFieldConfig as PaymentMethodLocalFieldConfig } from './PaymentMethod';
import PaymentType, { localFieldConfig as PaymentTypeLocalFieldConfig } from './PaymentType';
import PrePaymentDate, {
  localFieldConfig as PrePaymentDateLocalFieldConfig,
} from './PrePaymentDate';
import SurName, { fieldConfig as SurNameLocalFieldConfig } from './SurName';
import TransferClassification, {
  localFieldConfig as TransferClassificationLocalFieldConfig,
} from './TransferClassification';
import AccountType, { localFieldConfig as AccountTypeConfig } from './AccountType';

export const localFieldConfigs = [
  FirstNameLocalFieldConfig,
  IsCorporationLocalFieldConfig,
  LifeJClientNoLocalFieldConfig,
  PayeeTypeLocalFieldConfig,
  PaymentMethodLocalFieldConfig,
  PaymentTypeLocalFieldConfig,
  PrePaymentDateLocalFieldConfig,
  SurNameLocalFieldConfig,
  TransferClassificationLocalFieldConfig,
  AccountTypeConfig,
];

export default {
  FirstName,
  IsCorporation,
  LifeJClientNo,
  PayeeType,
  PaymentMethod,
  PaymentType,
  PrePaymentDate,
  SurName,
  TransferClassification,
  AccountType,
};
