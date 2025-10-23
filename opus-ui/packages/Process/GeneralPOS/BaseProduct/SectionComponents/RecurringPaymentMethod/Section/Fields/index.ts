import CardHolderName, { localFieldConfig as CardHolderNameConfig } from './CardHolderName';
import CardType, { localFieldConfig as CardTypeConfig } from './CardType';
import CreditCardNumber, { localFieldConfig as CreditCardNumberConfig } from './CreditCardNumber';
import ExpiryDate, { localFieldConfig as ExpiryDateConfig } from './ExpiryDate';
import PayInOption, { localFieldConfig as PayInOptionConfig } from './PayInOption';

export const localFieldConfigs = [
  CardHolderNameConfig,
  CreditCardNumberConfig,
  ExpiryDateConfig,
  PayInOptionConfig,
  CardTypeConfig,
];

export default {
  CreditCardNumber,
  ExpiryDate,
  CardHolderName,
  PayInOption,
  CardType,
};
