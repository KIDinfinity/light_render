import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { VLD_000379, VLD_000389 } from 'claim/pages/PaymentAllocation/_validators/fieldValidators';
import { EHasBankAccount, EPaymentMethod } from '../_dto/Enums';

const getBankAccountError = (claimData: any) => {
  const payeeList = lodash.get(claimData, 'payeeList');
  const bankAccountError: any = [];

  lodash.forEach(payeeList, (payeeItem: any) => {
    const payeeBankAccountList = lodash.get(payeeItem, 'payeeBankAccountList');
    const paymentMethodVal = formUtils.queryValue(payeeItem?.paymentMethod);
    const isPrem = paymentMethodVal === EPaymentMethod.PremiumAccount;
    const isBankAccount = lodash.values(EHasBankAccount).includes(paymentMethodVal);
    if (isBankAccount && !isPrem) {
      const VLD000379Error = VLD_000379(payeeItem);
      if (VLD000379Error) {
        bankAccountError.push(VLD000379Error);
      }

      tenant.region({
        [Region.PH]: () => {
          const VLD_000389Error = VLD_000389(payeeBankAccountList);
          if (VLD_000389Error) {
            bankAccountError.push(VLD_000389Error);
          }
        },
      });
    }
  });

  return bankAccountError;
};

export default getBankAccountError;
