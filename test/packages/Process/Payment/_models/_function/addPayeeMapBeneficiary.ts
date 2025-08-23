import lodash from 'lodash';
import { payeeAssembly, getBankAccount } from '.';
import type { BeneficiaryModal } from '../_dto/Models';

/**
 * 添加一个payee并将beneficiary对象的人的信心同步到payee对象
 * @param claimData
 * @param beneficiaryItem
 */
const addPayeeMapBeneficiary = (claimData: any, beneficiaryItem: BeneficiaryModal) => {
  if (lodash.isEmpty(claimData)) return [];
  const { c360BeneficiaryInfo } = claimData;

  const payeeItem: any = payeeAssembly(claimData);
  const { policyBankAccountList } = c360BeneficiaryInfo || {};

  const { phoneNo, clientId } = beneficiaryItem;

  // 同步telNo以及将新建的payee关联到对应的beneficiary对象
  lodash.set(payeeItem, 'payeeContactList[0].telNo', phoneNo);
  lodash.set(beneficiaryItem, 'payeeId', payeeItem?.id);
  lodash.set(
    beneficiaryItem,
    'payoutCurrency',
    payeeItem?.payoutCurrency || beneficiaryItem.payoutCurrency
  );

  if (clientId) {
    const payeeBankAccountList = getBankAccount(policyBankAccountList, clientId);
    const payeeBankAccounts = !lodash.isEmpty(payeeBankAccountList)
      ? payeeBankAccountList
      : payeeItem.payeeBankAccountList;
    // 生成bank account信息
    lodash.set(payeeItem, 'payeeBankAccountList', payeeBankAccounts);
  }

  return beneficiaryItem;
};

export default addPayeeMapBeneficiary;
