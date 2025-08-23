import Transactionno, { fieldConfig as transactionNoConfig } from './Transactionno';

import Paymentdate, { fieldConfig as paymentDateConfig } from './Paymentdate';

import Dateofdeduction, { fieldConfig as dateOfDeductionConfig } from './Dateofdeduction';

import Paytype, { fieldConfig as payTypeConfig } from './Paytype';

import Policyinitialpremium, {
  fieldConfig as policyInitialPremiumConfig,
} from './Policyinitialpremium';

import Reason, { fieldConfig as reasonConfig } from './Reason';

import Deductionstatus, { fieldConfig as deductionStatusConfig } from './Deductionstatus';

import Paidamount, { fieldConfig as paidAmountConfig } from './Paidamount';

import Paymentoption, { fieldConfig as paymentOptionConfig } from './Paymentoption';

import PaymentMethodType, { fieldConfig as PaymentMethodTypeConfig } from './PaymentMethodType';

import CardIssuerCountry, { fieldConfig as CardIssuerCountryConfig } from './CardIssuerCountry';

import HaveCreditCard, { fieldConfig as HaveCreditCardConfig } from './HaveCreditCard';

import Premiumshortfall, { fieldConfig as premiumShortfallConfig } from './Premiumshortfall';

import Paymentreferenceno, { fieldConfig as paymentReferenceNoConfig } from './Paymentreferenceno';

import AccountNo, { fieldConfig as AccountNoConfig } from './AccountNo';

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
};
