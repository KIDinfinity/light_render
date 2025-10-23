import lodash from 'lodash';

/**
 * 全量设置payee下面的bank name（根据已知的code）
 * @param payeeList
 * @param dicts
 * @returns
 */
const updateBankNames = (payeeList: any[], dicts: any) =>
  lodash.map(payeeList, (payee: any) => {
    const { payeeBankAccountList } = payee || {};

    const bankAccountList = lodash.map(payeeBankAccountList, (bank: any) => {
      const { bankCode, branchCode } = bank;

      lodash.set(bank, 'bankName', lodash.find(dicts.bankDicts, { bankCode })?.bankName);
      lodash.set(
        bank,
        'branchName',
        lodash.find(dicts.branchDicts, { bankCode, branchCode })?.branchName
      );

      return bank;
    });

    lodash.set(payee, 'payeeBankAccountList', bankAccountList);

    return payee;
  });

export default updateBankNames;
