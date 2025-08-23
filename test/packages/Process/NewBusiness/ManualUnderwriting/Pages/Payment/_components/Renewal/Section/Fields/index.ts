import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import Bankcode, { fieldConfig as bankCodeConfig } from './Bankcode';

import Accountno, { fieldConfig as accountNoConfig } from './Accountno';

import NameOnCard, { fieldConfig as nameOnCardConfig } from './NameOnCard';

import Cardtype, { fieldConfig as cardTypeConfig } from './Cardtype';

import Creditcardno, { fieldConfig as creditCardNoConfig } from './Creditcardno';

import Maskedcreditcardno, { fieldConfig as maskedCreditCardNoConfig } from './Maskedcreditcardno';

import ExpiryDate, { fieldConfig as expiryDateConfig } from './ExpiryDate';

import Sbcaca, { fieldConfig as SbcacaConfig } from './Sbcaca';

import Bankacctfactoryhouse, {
  fieldConfig as bankAcctFactoryHouseConfig,
} from './Bankacctfactoryhouse';

import Factoringhouse, { fieldConfig as factoringHouseConfig } from './Factoringhouse';

import Businessbankcode, { fieldConfig as businessBankcodeConfig } from './Businessbankcode';

import AccountHolderType, { fieldConfig as AccountHolderTypeConfig } from './AccountHolderType';

import RelationshipWithInsured, {
  localFieldConfig as RelationshipWithInsuredConfig,
} from './RelationshipWithInsured';

import Bankcity, { fieldConfig as bankCityConfig } from './Bankcity';
import Renewalpaytype, { fieldConfig as RenewalpaytypeConfig } from './Renewalpaytype';

export const localFieldConfigs = [
  bankAcctNameConfig,

  bankCodeConfig,

  accountNoConfig,

  nameOnCardConfig,

  cardTypeConfig,

  creditCardNoConfig,

  maskedCreditCardNoConfig,

  SbcacaConfig,

  expiryDateConfig,

  bankAcctFactoryHouseConfig,

  factoringHouseConfig,

  businessBankcodeConfig,

  AccountHolderTypeConfig,

  RelationshipWithInsuredConfig,
  bankCityConfig,
  RenewalpaytypeConfig,
];

export default {
  BankAcctName,

  Bankcode,

  Accountno,

  NameOnCard,

  Cardtype,

  Creditcardno,

  Maskedcreditcardno,

  Sbcaca,

  ExpiryDate,

  Bankacctfactoryhouse,

  Factoringhouse,

  Businessbankcode,

  AccountHolderType,

  RelationshipWithInsured,
  Bankcity,
  Renewalpaytype,
};
