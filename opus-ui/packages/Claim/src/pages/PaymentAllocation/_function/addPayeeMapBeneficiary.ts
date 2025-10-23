import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { payeeAssembly, getBankAccount } from '.';
import type { BeneficiaryModal } from '../_dto/Models';
import { EPaymentMethod } from '../_dto/Enums';

/**
 * 添加一个payee并将beneficiary对象的人的信心同步到payee对象
 * @param claimData
 * @param beneficiaryItem
 */
const addPayeeMapBeneficiary = (claimData: any, beneficiaryItem: BeneficiaryModal) => {
  if (lodash.isEmpty(claimData)) return [];
  const { payeeList, c360BeneficiaryInfo } = claimData;
  const output: any = {};
  const payeeItem: any = payeeAssembly(claimData);
  const { policyBankAccountList } = c360BeneficiaryInfo || {};

  const {
    gender,
    email,
    dateOfBirth,
    identityNo,
    identityType,
    postCode,
    address,
    phoneNo,
    clientId,
    firstName,
    surname,
  } = beneficiaryItem;

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

  // 同步beneficiary上的相关信息到payee对象
  output.payeeList = lodash
    .chain(payeeList)
    .concat({
      ...payeeItem,
      gender,
      email,
      dateOfBirth,
      identityNo,
      identityType,
      postCode,
      address,
      firstName,
      surname,
      paymentMethod: tenant.region({
        [Region.JP]: EPaymentMethod.BankTransfer,
        [Region.PH]: EPaymentMethod.BankTransfer,
        notMatch: '',
      }),
    })
    .compact()
    .value();

  output.beneficiary = beneficiaryItem;

  return output;
};

export default addPayeeMapBeneficiary;
