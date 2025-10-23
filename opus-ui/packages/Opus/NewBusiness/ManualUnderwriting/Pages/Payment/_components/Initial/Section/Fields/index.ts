import AccountNo, { fieldConfig as AccountNoConfig } from './AccountNo';
import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';
import CardIssuerCountry, { fieldConfig as CardIssuerCountryConfig } from './CardIssuerCountry';
import CreditCardMode, { fieldConfig as creditCardModeConfig } from './CreditCardMode';
import Dateofdeduction, { fieldConfig as dateOfDeductionConfig } from './Dateofdeduction';
import Deductionstatus, { fieldConfig as deductionStatusConfig } from './Deductionstatus';
import HaveCreditCard, { fieldConfig as HaveCreditCardConfig } from './HaveCreditCard';
import Paidamount, { fieldConfig as paidAmountConfig } from './Paidamount';
import Paymentdate, { fieldConfig as paymentDateConfig } from './Paymentdate';
import PaymentMethodType, { fieldConfig as PaymentMethodTypeConfig } from './PaymentMethodType';
import Paymentoption, { fieldConfig as paymentOptionConfig } from './Paymentoption';
import Paymentreferenceno, { fieldConfig as paymentReferenceNoConfig } from './Paymentreferenceno';
import Paytype, { fieldConfig as payTypeConfig } from './Paytype';
import Policyinitialpremium, {
  fieldConfig as policyInitialPremiumConfig,
} from './Policyinitialpremium';
import Premiumshortfall, { fieldConfig as premiumShortfallConfig } from './Premiumshortfall';
import Reason, { fieldConfig as reasonConfig } from './Reason';
import Transactionno, { fieldConfig as transactionNoConfig } from './Transactionno';

export const localFieldConfigs = [
  transactionNoConfig,

  paymentDateConfig,

  dateOfDeductionConfig,

  payTypeConfig,

  policyInitialPremiumConfig,

  reasonConfig,

  deductionStatusConfig,

  paidAmountConfig,

  paymentOptionConfig,

  PaymentMethodTypeConfig,

  CardIssuerCountryConfig,

  HaveCreditCardConfig,

  premiumShortfallConfig,

  paymentReferenceNoConfig,

  AccountNoConfig,

  creditCardModeConfig,

  bankCodeConfig,
];

export default {
  Transactionno,

  Paymentdate,

  Dateofdeduction,

  Paytype,

  Policyinitialpremium,

  Reason,

  Deductionstatus,

  Paidamount,

  Paymentoption,

  PaymentMethodType,

  CardIssuerCountry,

  HaveCreditCard,

  Premiumshortfall,

  Paymentreferenceno,

  AccountNo,

  CreditCardMode,

  BankCode,
};
