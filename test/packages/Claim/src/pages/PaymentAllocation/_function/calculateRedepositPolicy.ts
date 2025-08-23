import { multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash, { toNumber } from 'lodash';
import { calcRedepositConvertedAmount } from '.';

/**
 *
 * @param payeeList
 * 计算payeeList中每个redeposit 重新计算
 */
const calculateRedepositPolicy = (payeeList: any[]) => {
  try {
    if (lodash.isArray(payeeList) && payeeList.length > 0) {
      return lodash.map(payeeList, (payeeEntity) => {
        const payoutAmount = payeeEntity?.payoutAmount;
        const claimRedepositList = payeeEntity?.claimRedepositList;
        const claimRedepositListTemp = lodash
          .chain(claimRedepositList)
          .map((claimRedeposit) => {
            const { redepositPercentage, exchangeRateRecord, redepositAmount } = claimRedeposit;
            const redepositPercentageValue = toNumber(formUtils.queryValue(redepositPercentage));
            let newRedepositAmount = redepositAmount;
            const convertedAmount = calcRedepositConvertedAmount(payoutAmount, exchangeRateRecord);

            // recalculate redeposit amount

            newRedepositAmount = multiply(redepositPercentageValue * 0.01, convertedAmount);

            return {
              ...claimRedeposit,
              redepositAmount: newRedepositAmount,
            };
          })
          .value();
        return { ...payeeEntity, claimRedepositList: claimRedepositListTemp };
      });
    }

    return payeeList;
  } catch {
    return payeeList;
  }
};

export default calculateRedepositPolicy;
