import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { tenant, Region } from '@/components/Tenant';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, BankAccountModal } from '../_dto/Models';
import { Contact } from '../_dto/Consts';
import { bankAccountReOrder } from '.';

/**
 * 当payee没有contact信息时，补充空的contact对象
 * @param payeeList
 * @param claimData
 */
const supplementPayee = (payeeList?: PayeeModal[], submitting?: boolean) => {
  if (lodash.isEmpty(payeeList)) return payeeList;
  const systemCurrency = tenant.currency();

  return lodash
    .chain(payeeList)
    .compact()
    .map((itemPayee: any) => {
      const { id, claimNo, payeeContactList, payoutCurrency, payeeBankAccountList } = itemPayee;
      const itemPayeeTemp = { ...itemPayee };

      itemPayeeTemp.payoutCurrency = payoutCurrency || systemCurrency;

      if (lodash.isEmpty(payeeContactList)) {
        const manualAdd = SwitchEnum.YES;
        const contact = { ...Contact, claimNo, manualAdd, payeeId: id, sms: 'Y' };
        contact.id = uuid();
        itemPayeeTemp.payeeContactList = [contact];
      }
      itemPayeeTemp.payeeContactList = tenant.region({
        [Region.TH]: lodash.map(itemPayeeTemp.payeeContactList, (item) => ({
          ...item,
          sms: item?.sms || 'Y',
        })),
        [Region.ID]: lodash.map(itemPayeeTemp.payeeContactList, (item) => ({
          ...item,
          sms: item?.sms || 'Y',
        })),
        notMatch: () => itemPayeeTemp.payeeContactList,
      });
      if (!submitting && !lodash.isEmpty(payeeBankAccountList)) {
        const tempAccounts: BankAccountModal[] = bankAccountReOrder(payeeBankAccountList);
        const selectFirst = lodash.every(
          payeeBankAccountList,
          (account: BankAccountModal) => !formUtils.queryValue(account.isSelect)
        );
        if (selectFirst) {
          tempAccounts[0] = {
            ...tempAccounts[0],
            isSelect: true,
          }
        }
        itemPayeeTemp.payeeBankAccountList = tempAccounts;
      }

      return itemPayeeTemp;
    })
    .value();
};

export default supplementPayee;
