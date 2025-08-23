import CardHolderName, { localFieldConfig as CardHolderNameConfig } from './CardHolderName';
import CardType, { localFieldConfig as CardTypeConfig } from './CardType';
import CreditCardNumber, { localFieldConfig as CreditCardNumberConfig } from './CreditCardNumber';
import ExpiryDate, { localFieldConfig as ExpiryDateConfig } from './ExpiryDate';
import PayInOption, { localFieldConfig as PayInOptionConfig } from './PayInOption';
import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';

export const localFieldConfigs = [
  CardHolderNameConfig,
  CreditCardNumberConfig,
  ExpiryDateConfig,
  PayInOptionConfig,
  CardTypeConfig,
  BankCodeConfig,
];

export default {
  CreditCardNumber,
  ExpiryDate,
  CardHolderName,
  PayInOption,
  CardType,
  BankCode,
};
