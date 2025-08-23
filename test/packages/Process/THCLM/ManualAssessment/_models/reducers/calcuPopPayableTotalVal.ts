/* eslint-disable no-param-reassign */

import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { subtract, multiply } from '@/utils/precisionUtils';
import { totalCalculate, positiveInteger } from '../functions';
import { add } from '@/utils/precisionUtils';

const calcuPopPayableTotalVal = (state: any, { payload }: any) => {
  const { serviceItemId, benefitItemId, chooise } = payload;

  return produce(state, (draftState: any) => {
    const { claimEntities, popUpPayable } = draftState;
    const { serviceItemListMap = {}, serviceItemPayableListMap } = claimEntities || {};

    const serviceItem = serviceItemListMap[serviceItemId];
    const { expense, otherInsurerPaidAmount } = formUtils.cleanValidateData(serviceItem) || {};

    const getPayableAmount = ({ exchangeRatePolicyPayout, payoutToPolicyExchangeRate }: any) => {
      const hasPaidServicePayable = lodash.filter(
        serviceItemPayableListMap,
        (item) => item.serviceItemId === serviceItemId
      );

      const remaining = multiply(
        subtract(expense, positiveInteger(otherInsurerPaidAmount)),
        positiveInteger(exchangeRatePolicyPayout, 1)
      );

      const hasPaidTotal = totalCalculate(hasPaidServicePayable, ['payoutAmount']);

      const payableAmount = multiply(
        subtract(positiveInteger(remaining), positiveInteger(hasPaidTotal.payoutAmount)),
        positiveInteger(payoutToPolicyExchangeRate, 1)
      );
      return payableAmount;
    };

    const data = popUpPayable.benefitListMap[benefitItemId].listMap[serviceItemId];

    draftState.popUpPayable.benefitListMap[benefitItemId].listMap[serviceItemId] = {
      ...data,
      chooise,
      payableAmount: !data?.isUpdate ? getPayableAmount(data) : data?.payableAmount,
    };

    const totalPayableAmount: any = lodash
      .chain(draftState.popUpPayable?.benefitListMap[benefitItemId]?.listMap)
      .values()
      .reduce((total: any, item: any) => {
        return add(Number(total), Number(formUtils.queryValue(item?.payableAmount) || 0));
      }, 0)
      .value();
    draftState.popUpPayable.benefitListMap[benefitItemId].payableAmount =
      totalPayableAmount === 0 ? null : totalPayableAmount;
  });
};

export default calcuPopPayableTotalVal;
