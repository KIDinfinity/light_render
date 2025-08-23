import { safeParse } from '@/utils/cache/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash, { isNumber, toNumber } from 'lodash';
import { EPaymentMethod, EPayTo } from '../_dto/Enums';
import type {
  BankAccountModal,
  BeneficiaryModal,
  PayeeModal,
  PolicyBenefitModal,
} from '../_dto/Models';
import {
  duplicateBankAccount,
  duplicateBeneficiary,
  duplicatePayee,
  excludePaymentMethod,
} from './validatorUtils';

/**
 * TODO:以后PH的校验都用自己的文件
 */

/**
 *
 * @param policyBenefits  校验policy benefit是否重复
 * Validate if there are duplicate records with the same
 * policy id,payable type,pay to, claim beneficiary
 * when adding/modifying claim beneficiary records
 */

export const VLD_000331 =
  (policyBenefit?: PolicyBenefitModal, beneficiaryItem?: BeneficiaryModal) =>
  (rule: any, value: any, callback: Function) => {
    const { result, isMultiple } = duplicateBeneficiary(policyBenefit, beneficiaryItem, value);
    if (value === EPayTo.Beneficiary) {
      return callback();
    }

    if (!isMultiple) {
      return callback();
    }

    if (result) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000359' }));
    }
    callback();
  };

/**
 *
 * @param payeeList  校验payee name是否重复
 * Validate if there are duplicate records with the same name
 * when adding/modifying payee records
 */
export const VLD_000332 =
  (payeeList: PayeeModal[], curPayee?: PayeeModal) =>
  (rule: any, value: any, callback: Function) => {
    const { result, isMultiple } = duplicatePayee(payeeList, curPayee, value);

    if (!isMultiple) {
      return callback();
    }
    if (result) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000360' }));
    }
    callback();
  };

/**
 *
 * @param bankAccountList  校验bank account是否重复
 * @param curBankAccountItem  校验bank account是否重复
 * Validate if there are duplicate records with
 * the same account holder and account number
 * when adding/modifying bank account records
 */
export const VLD_000333 =
  (bankAccountList: BankAccountModal[], curBankAccountItem?: BankAccountModal) =>
  (rule: any, value: any, callback: Function) => {
    const { result, isMultiple } = duplicateBankAccount(bankAccountList, curBankAccountItem, value);

    if (!isMultiple) {
      return callback();
    }

    if (result) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000361' }));
    }
    callback();
  };

export const VLD_000327 = (paymentMethod: string, chequeRemark: string, isRequireArr: any[]) => {
  const isRequire = lodash.includes(isRequireArr, paymentMethod);
  const errorInfo =
    isRequire &&
    chequeRemark === '' &&
    formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  return errorInfo;
};

export const VLD_000379 = (payeeItem: any) => {
  const payeeBankAccountList = payeeItem?.payeeBankAccountList || [];
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);

  if (
    (paymentMethod === EPaymentMethod.BankTransfer ||
      paymentMethod === EPaymentMethod.DirectCredit) &&
    lodash.every(payeeBankAccountList, (item) => !formUtils.queryValue(item.isSelect))
  ) {
    return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000400' });
  }
  return false;
};

export const VLD_000389 = (payeeBankAccountList?: any[]) => {
  if (!lodash.isEmpty(payeeBankAccountList)) {
    const isSelected = lodash.some(
      payeeBankAccountList,
      (item) => !!formUtils.queryValue(item.isSelect)
    );
    if (!isSelected) {
      return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000400' });
    }
  }
  return '';
};

/**
 * 校验Multiple Policy Owner
 * @param payeeList
 * @param relatePolicyOwnerPayeeIds
 */
export const VLD_000426 =
  (payeeList?: PayeeModal[], relatePolicyOwnerPayeeIds?: string[]) =>
  (rule: any, value: any, callback: Function) => {
    const { result }: any = excludePaymentMethod(payeeList, relatePolicyOwnerPayeeIds, value);

    if (!result) {
      return callback();
    }

    if (result) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000456' }));
    }
    callback();
  };

/**
 * Checking if the redeposit % equal 100%
 * or total redeposit amount equal payout amount
 * @param payeeList
 * @param relatePolicyOwnerPayeeIds
 */

export const VLD_000991 = (payeeItem: PayeeModal) => {
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);
  const subPaymentMethod = formUtils.queryValue(payeeItem?.subPaymentMethod);

  const payoutAmount = formUtils.queryValue(payeeItem?.payoutAmount);
  const claimRedepositList = lodash.get(payeeItem, 'claimRedepositList');
  const redepositPercentageSum = lodash
    .chain(claimRedepositList)
    .reduce((pre, cur) => pre + toNumber(cur?.redepositPercentage), 0)
    .value();

  const redepositAmountSum = lodash
    .chain(claimRedepositList)
    .map(({ exchangeRateRecord, redepositAmount }) => {
      const exchangeRate = safeParse(exchangeRateRecord)?.[0]?.exchangeRate;
      const amount = formUtils.queryValue(redepositAmount);
      return isNumber(exchangeRate) && isNumber(amount) ? amount / exchangeRate : 0;
    })
    .sum()
    .value();
  console.log('redepositAmountSum: ', redepositAmountSum);
  const isRedepositMethod = paymentMethod === 'CHQM' && subPaymentMethod === 'RTPX';
  const notSameAmountSum = Math.abs(payoutAmount - redepositAmountSum) > 0.1;
  if ((redepositPercentageSum !== 100 || notSameAmountSum) && isRedepositMethod) {
    const message = { Label_COM_WarningMessage: 'MSG_001044' };
    return message;
  }
  return false;
};

/**
 * Checking if USD payout amount is redeposit to HKD.
 * @param payeeList
 * @param relatePolicyOwnerPayeeIds
 */

export const VLD_000992 = (payeeItem: PayeeModal) => {
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);
  const subPaymentMethod = formUtils.queryValue(payeeItem?.subPaymentMethod);

  const payoutCurrency = formUtils.queryValue(payeeItem?.payoutCurrency);
  const claimRedepositList = lodash.get(payeeItem, 'claimRedepositList');
  const haveRedeposit = claimRedepositList?.length && claimRedepositList.length > 0;
  if (!haveRedeposit) return false;
  const isRedepositMethod = paymentMethod === 'CHQM' && subPaymentMethod === 'RTPX';
  const isIllegalRedepositCurrency =
    payoutCurrency !== 'HKD' &&
    lodash.some(claimRedepositList, (item) => item.redepositPolicyCurrency === 'HKD');

  if (isIllegalRedepositCurrency && isRedepositMethod) {
    const message = { Label_COM_WarningMessage: 'MSG_001045', values: [payoutCurrency] };
    return message;
  }
  return false;
};
export const VLD_001139 = (payeeList: any) => {
  if (lodash.isEmpty(payeeList) || payeeList.length === 0) {
    return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001302' });
  }

  const hasInvalidPayee = payeeList.some(
    (item: any) =>
      formUtils.queryValue(item?.payoutAmount) != 0 && !formUtils.queryValue(item?.paymentMethod)
  );

  return hasInvalidPayee ? formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001302' }) : false;
};
