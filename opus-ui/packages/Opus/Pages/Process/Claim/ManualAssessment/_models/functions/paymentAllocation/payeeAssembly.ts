import { SwitchEnum } from 'claim/pages/utils/claim';
import { v4 as uuidv4 } from 'uuid';
import { tenant, Region } from '@/components/Tenant';
import { BankDesc, PaymentType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { CONTACT, BANKACCOUNT, PAYEEITEM } from '@/utils/claimConstant';

/**
 * 过滤用户在UI界面新增的数据
 * @param datas 需要过滤的数据
 */
const payeeAssembly = (claimData: any = {}) => {
  const { claimNo, claimDecision, isLifeJ } = claimData;
  const manualAdd = SwitchEnum.YES;
  const systemCurrency = tenant.currency();

  const payee = { ...CONTACT, claimNo, manualAdd };
  const bankAccount = {
    ...BANKACCOUNT,
    claimNo,
    manualAdd,
    isNewBankAccount: isLifeJ ? SwitchEnum.YES : undefined,
    bankDesc: isLifeJ ? BankDesc.KLIP : undefined,
  };
  const contact = { ...PAYEEITEM, claimNo, manualAdd };

  payee.id = uuidv4();
  bankAccount.id = uuidv4();
  bankAccount.payeeId = payee.id;
  contact.id = uuidv4();
  contact.payeeId = payee.id;

  payee.payeeBankAccountList = [bankAccount];
  payee.payeeContactList = [contact];
  payee.payoutCurrency = formUtils.queryValue(claimDecision.payoutCurrency) || systemCurrency;

  tenant.region({
    [Region.JP]: () => {
      payee.paymentType = PaymentType.URGE;
    },
  });

  return payee;
};

export default payeeAssembly;
