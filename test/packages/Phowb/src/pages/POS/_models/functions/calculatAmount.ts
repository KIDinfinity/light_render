import { isNaN } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { CalculatType } from '../../Enum';

export const calculationAmounts = (key: string, value: any, item: any) => {
  let total = 0;
  switch (key) {
    case CalculatType.WithdrawPercentage:
      total = (Number(formUtils.queryValue(value)) * Number(formUtils.queryValue(item.totalFundValue))) / 100;
      break;
    case CalculatType.withdrawNumberOfUnits:
      total = Number(formUtils.queryValue(value)) * Number(formUtils.queryValue(item.pricePerUnit));
      break;
    case CalculatType.WithdrawAmount:
      total = Number(formUtils.queryValue(value));
      break;

    default:
      break;
  }

  return total;
};

export const calculationIssuanceDPolicyChargeFee = (
  freeOfChange: boolean,
  timeOfReplacement: number
) => {
  return timeOfReplacement >= 2 && !freeOfChange ? 200 : 0;
};

export const calculationPrecisionFormat = (value: number | string) => {
  if (isNaN(+value)) return null;

  let result = `${value}`;
  result = result.replace(new RegExp(',*', 'g'), '');
  if (result.includes('.')) {
    const temp = result.split('.');
    temp[0] = temp[0].replace(new RegExp('\\B(?=(\\d{3})+(?!\\d))', 'g'), ',');

    result = temp.join('.');
  } else {
    result = result.replace(new RegExp('\\B(?=(\\d{3})+(?!\\d))', 'g'), ',');
  }
  return result;
};

export default {
  calculationAmounts,
  calculationIssuanceDPolicyChargeFee,
  calculationPrecisionFormat,
};
