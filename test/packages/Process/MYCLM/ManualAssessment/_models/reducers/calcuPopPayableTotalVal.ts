/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { subtract, multiply } from '@/utils/precisionUtils';
import { totalCalculate, positiveInteger } from '../functions';

const calcuPopPayableTotalVal = (state: any, { payload }: any) => {
  const { benefitItemId, listMapItemId, id, serviceItemId } = payload;

  return produce(state, (draftState: any) => {
    const { claimEntities } = draftState;
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
    const data =
      draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId].childrenMap[id];

    draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId].childrenMap[id] = {
      ...data,
      payableAmount: !data?.isUpdate ? getPayableAmount(data) : data?.payableAmount,
    };
  });
};

export default calcuPopPayableTotalVal;
