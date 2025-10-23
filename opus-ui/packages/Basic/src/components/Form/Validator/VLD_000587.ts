import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { subtract, multiply } from '@/utils/precisionUtils';
import { totalCalculate, positiveInteger } from 'process/THCLM/ManualAssessment/_models/functions';

// 入住ICU时间要早于出院时间
export const VLD_000587 = (data: any, serviceItemPayableListMap: any, serviceItemListMap: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const { payoutToPolicyExchangeRate, exchangeRatePolicyPayout, id, servicePayableId } = data;
  const serviceItem = lodash.get(serviceItemListMap, id);
  const { expense, otherInsurerPaidAmount } = formUtils.cleanValidateData(serviceItem) || {};

  const hasPaidServicePayable = lodash.filter(
    serviceItemPayableListMap,
    (item) => item.serviceItemId === id && item.id !== servicePayableId
  );

  const remaining = multiply(
    subtract(expense, positiveInteger(otherInsurerPaidAmount)),
    positiveInteger(exchangeRatePolicyPayout, 1)
  );

  const hasPaidTotal = totalCalculate(hasPaidServicePayable, ['payoutAmount', 'payableDays']);

  const payableAmount = multiply(
    subtract(positiveInteger(remaining), positiveInteger(hasPaidTotal.payoutAmount)),
    positiveInteger(payoutToPolicyExchangeRate, 1)
  );

  if (value > positiveInteger(payableAmount)) {
    callback(
      formatMessageApi({
        Label_COM_ErrorMessage: 'MSG_000506',
      })
    );
  }

  callback();
};
