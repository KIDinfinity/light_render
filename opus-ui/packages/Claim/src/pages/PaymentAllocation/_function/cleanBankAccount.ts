import { formUtils } from 'basic/components/Form';
import { PaymentMethod } from 'claim/pages/Enum';

/**
 * 根据payment method清除bank相关的信息
 * @param bankAccount
 * @param paymentMethod
 * @returns
 */
const cleanBankAccount = (bankAccount: any, paymentMethod: string) => {
  let bankAccountTemp = { ...bankAccount };
  const { bankCodeCache } = bankAccountTemp;
  const paymentMethodVal = formUtils.queryValue(paymentMethod);
  const bankCodeVal = formUtils.queryValue(bankCodeCache);
  const isPost = paymentMethodVal === PaymentMethod.PostBank;
  const isBank = paymentMethodVal === PaymentMethod.BankTransfer;
  const isPrem = paymentMethodVal === PaymentMethod.PremiumAccount;

  if (isPost || isBank) {
    bankAccountTemp = {
      ...bankAccountTemp,
      bankCode: '',
      bankName: '',
      branchCode: '',
      branchName: '',
      accountType: '',
      bankAccountNo: '',
      passbookNo: '',
      passbookCode: '',
      bankType: isPost ? 'POST' : 'BANK',
    };
  }

  if (isPrem && bankCodeVal) {
    if (bankCodeVal === '9900') {
      bankAccountTemp = {
        ...bankAccountTemp,
        // bankCode: '',
        bankName: '',
        branchCode: '',
        branchName: '',
        accountType: '',
        bankAccountNo: '',
        bankType: 'POST',
      };
    }

    if (bankCodeVal !== '9900') {
      bankAccountTemp = {
        ...bankAccountTemp,
        passbookNo: '',
        passbookCode: '',
        bankType: 'BANK',
      };
    }
  }

  return bankAccountTemp;
};

export default cleanBankAccount;
