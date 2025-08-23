import { SwitchEnum } from 'claim/pages/utils/claim';
import { v4 as uuid } from 'uuid';
import { tenant, Region } from '@/components/Tenant';
import { PaymentType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { Payee, BankAccount, Contact } from '../_dto/Consts';

/**
 * 过滤用户在UI界面新增的数据
 * @param datas 需要过滤的数据
 */
const payeeAssembly = (claimData: any = {}) => {
  const { claimNo, claimDecision } = claimData;
  const manualAdd = SwitchEnum.YES;
  const systemCurrency = tenant.currency();

  const payee = { ...Payee, claimNo, manualAdd };
  const bankAccount = { ...BankAccount, claimNo, manualAdd };
  const contact = { ...Contact, claimNo, manualAdd };

  payee.id = uuid();
  bankAccount.id = uuid();
  bankAccount.payeeId = payee.id;
  contact.id = uuid();
  contact.payeeId = payee.id;

  payee.payeeBankAccountList = [bankAccount];
  payee.payeeContactList = [contact];
  payee.payoutCurrency = formUtils.queryValue(claimDecision.payoutCurrency) || systemCurrency;

  tenant.region({
    [Region.JP]: () => {
      payee.paymentType = PaymentType.LS;
    },
  });

  return payee;
};

export default payeeAssembly;
