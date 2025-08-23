import lodash from 'lodash';
import { IsDefault, SubmissionChannel, relationshipWithInsuredForHK } from 'claim/enum';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';

export const getDefault = (data: any) =>
  lodash
    .chain(data)
    .filter((item: any) => item.isDefault === IsDefault.YES && !!item.id)
    .first()
    .value();

export const omitKeys = [
  'bankType',
  'accountType',
  'bankCode',
  'bankName',
  'accountHolder',
  'accountHolderKana',
  'bankAccountNo',
  'branchCode',
  'branchName',
  'passbookNo',
  'passbookCode',
  'contactType',
  'telNo',
  'phoneNo',
  'email',
  'address',
  'address2',
  'sms',
  'postCode',
  'bankDesc',
  'accountHolderClientId',
  'isNewBankAccount',
  'bankAccountName',
  'securityCode',
  'currencyCode',
  'currentFrom',
  'currentTo',
];

const payeeOmitKeys = [
  'bankType',
  'accountType',
  'bankCode',
  'bankName',
  'accountHolder',
  'accountHolderKana',
  'bankAccountNo',
  'branchCode',
  'branchName',
  'passbookNo',
  'passbookCode',
  'contactType',
  'telNo',
  'phoneNo',
  'email',
  'address',
  'address2',
  'sms',
  'postCode',
  'bankDesc',
  'accountHolderClientId',
];

const defContact = {
  email: '',
  contactType: '',
  address: '',
  address2: '',
  sms: '',
  postCode: '',
  telNo: '',
  isDefault: IsDefault.YES,
};

const defBankAccount = {
  bankCode: '',
  bankName: '',
  accountHolder: '',
  accountHolderKana: '',
  bankAccountNo: '',
  branchCode: '',
  branchName: '',
  passbookCode: '',
  passbookNo: '',
  bankDesc: '',
  accountHolderClientId: '',
  isNewBankAccount: '',
  bankAccountName: '',
  securityCode: '',
  currencyCode: '',
  currentFrom: '',
  currentTo: '',
  isDefault: IsDefault.YES,
};

export function getPayeeDefaultData(payee: any) {
  const mapContact = getDefault(payee?.payeeContactList);
  const mapBankAccount = getDefault(payee?.payeeBankAccountList);
  const {
    bankCode,
    bankName,
    accountHolder,
    accountHolderKana,
    bankAccountNo,
    branchCode,
    branchName,
    passbookCode,
    passbookNo,
    bankType,
    accountType,
    bankDesc,
    accountHolderClientId,
    isNewBankAccount,
    bankAccountName,
    securityCode,
    currencyCode,
    currentFrom,
    currentTo,
  } = lodash.pick(mapBankAccount || defBankAccount, omitKeys);

  const { email, contactType, address, address2, sms, postCode, telNo } = lodash.pick(
    mapContact || defContact,
    omitKeys
  );

  return {
    ...payee,
    bankType,
    bankCode,
    bankName,
    accountHolder,
    accountHolderKana,
    accountType,
    bankAccountNo,
    branchCode,
    branchName,
    passbookCode,
    passbookNo,
    contactType,
    phoneNo: telNo,
    bankAccountName,
    securityCode,
    currencyCode,
    currentFrom,
    currentTo,

    email,
    address,
    address2,
    sms,
    postCode,
    bankDesc,
    accountHolderClientId,
    isNewBankAccount,
  };
}

export function getPayeeGOPBillingDefault(payee: any, submissionChannel: string) {
  const { payeeType, organization } = payee;
  return {
    ...payee,
    payeeType:
      submissionChannel === SubmissionChannel.GOPBilling && lodash.isEmpty(payeeType)
        ? relationshipWithInsuredForHK.medicalProvider
        : payeeType,
    organization:
      submissionChannel === SubmissionChannel.GOPBilling && lodash.isEmpty(organization)
        ? 1
        : organization,
  };
}

export function getDefaultPayeeId(payeeListMap: any) {
  const mapPayee = getDefault(payeeListMap);

  return mapPayee ? lodash.get(mapPayee, 'id') : '';
}

export function saveDefaultPayee(payee: any, changedFields?: any) {
  const keys = lodash.keys(changedFields);
  const defaultPayee = getPayeeDefaultData(payee);
  let merged: any = {};

  if (!lodash.isUndefined(changedFields) && keys.length === 1) {
    const key: string = lodash.first(keys) as string;
    const picked = lodash.pick(payee, omitKeys);

    if (!lodash.get(picked, `${key}.errors`)) {
      lodash.set(picked, key, formUtils.queryValue(picked?.[key]));
    }
    merged = lodash.merge(defaultPayee, picked);
  } else {
    merged = lodash.merge(defaultPayee, lodash.pick(payee, payeeOmitKeys));
  }

  const {
    bankType,
    bankCode,
    bankName,
    accountHolder,
    accountHolderKana,
    bankAccountNo,
    branchCode,
    branchName,
    passbookCode,
    passbookNo,
    accountType,
    contactType,
    email,
    address,
    address2,
    sms,
    postCode,
    // telNo,
    phoneNo,
    bankDesc,
    accountHolderClientId,
    isNewBankAccount,
    bankAccountName,
    securityCode,
    currencyCode,
    currentFrom,
    currentTo,
  } = merged;

  let { payeeBankAccountList = [], payeeContactList = [] } = payee || {};

  if (!lodash.isArray(payeeBankAccountList)) {
    payeeBankAccountList = [];
  }

  if (!lodash.isArray(payeeContactList)) {
    payeeContactList = [];
  }

  const defaultBankAccount = getDefault(payeeBankAccountList);
  const defaultContact = getDefault(payeeContactList);

  if (!defaultBankAccount) {
    lodash.set(defBankAccount, 'id', uuidv4());
    payeeBankAccountList.push(defBankAccount);
  }
  if (!defaultContact) {
    lodash.set(defContact, 'id', uuidv4());
    payeeContactList.push(defContact);
  }

  const newBankAccountList = lodash
    .chain(payeeBankAccountList)
    .filter((item: any) => !!item.id)
    .uniqBy('id')
    .map((bankAccount: any) => {
      if (bankAccount?.isDefault === IsDefault.YES) {
        bankAccount.bankCode = bankCode;
        bankAccount.bankName = bankName;
        bankAccount.accountHolder = accountHolder;
        bankAccount.accountHolderKana = accountHolderKana;
        bankAccount.bankAccountNo = bankAccountNo;
        bankAccount.branchCode = branchCode;
        bankAccount.branchName = branchName;
        bankAccount.passbookCode = passbookCode;
        bankAccount.passbookNo = passbookNo;
        bankAccount.accountType = accountType;
        bankAccount.bankType = bankType;
        bankAccount.bankDesc = bankDesc;
        bankAccount.accountHolderClientId = accountHolderClientId;
        bankAccount.isNewBankAccount = isNewBankAccount;
        bankAccount.bankAccountName = bankAccountName;
        bankAccount.securityCode = securityCode;
        bankAccount.currencyCode = currencyCode;
        bankAccount.currentFrom = currentFrom;
        bankAccount.currentTo = currentTo;
      }

      return bankAccount;
    })
    .compact()
    .value();
  const newContractList = lodash
    .chain(payeeContactList)
    .filter((item: any) => !!item.id)
    .uniqBy('id')
    .map((contact: any) => {
      if (contact?.isDefault === IsDefault.YES) {
        contact.email = email;
        contact.contactType = contactType;
        contact.address = address;
        contact.address2 = address2;
        contact.sms = sms;
        contact.telNo = phoneNo || contact.telNo;
        contact.postCode = postCode;
      }

      return contact;
    })
    .compact()
    .value();

  const clearPayee = lodash.chain(payee).cloneDeep().omit(omitKeys).value();

  return {
    ...clearPayee,
    payeeBankAccountList: newBankAccountList,
    payeeContactList: newContractList,
  };
}

/**
 * 保存扁平化的payee
 * @param payeeListMap
 * @param payeeId
 * @param payeeItem
 */
export function saveNormalizedPayee(payeeListMap: any, payeeItem: any, payeeId: string) {
  const payeeListTemp: string[] = [];

  const payeeListMapTemp = lodash.reduce(
    payeeListMap,
    (collect, value, key) => {
      if (value.id && key === value.id && key === payeeId) {
        lodash.set(collect, key, payeeItem);
        payeeListTemp.push(key);
      }
      if (value.id && key === value.id && key !== payeeId) {
        lodash.set(collect, key, value);
        payeeListTemp.push(key);
      }
      return collect;
    },
    {}
  );

  return { payeeList: payeeListTemp, payeeListMap: payeeListMapTemp };
}

export default {
  getPayeeDefaultData,
  getDefaultPayeeId,
  saveDefaultPayee,
  saveNormalizedPayee,
  omitKeys,
};
