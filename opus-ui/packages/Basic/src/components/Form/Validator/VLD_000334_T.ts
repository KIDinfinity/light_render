import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import type { PayeeModal } from '../_dto/Models';

/**
 *
 * @param claimData 理赔对象
 */
export const VLD_000334_T = (claimData: any) => {
  const payeeList: PayeeModal[] = claimData?.payeeList;
  const { claimDecision } = claimData;
  const totalPaymentAmount = +lodash
    .chain(payeeList)
    .filter((payeeItem: PayeeModal) => !!formUtils.queryValue(payeeItem.paymentAmount))
    .reduce((total, payee: PayeeModal) => {
      return add(formUtils.queryValue(payee.paymentAmount) as number, total);
    }, 0)
    .value();
  const decisionPayableAmount = formUtils.queryValue(claimDecision?.totalPayableAmount);

  if (decisionPayableAmount && decisionPayableAmount !== totalPaymentAmount)
    return ['Label_COM_WarningMessage:MSG_000362'];

  return [];
};
