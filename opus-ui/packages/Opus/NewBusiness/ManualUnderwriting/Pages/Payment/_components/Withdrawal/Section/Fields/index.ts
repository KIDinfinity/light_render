import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankName, { fieldConfig as bankNameConfig } from './BankName';
import Refundpaytype, { fieldConfig as RefundpaytypeConfig } from './Refundpaytype';

export const localFieldConfigs = [
  bankAcctNameConfig,
  bankAccountNoConfig,
  bankNameConfig,
  RefundpaytypeConfig,
];

export default {
  BankAcctName,

  BankAccountNo,

  BankName,

  Refundpaytype,
};
