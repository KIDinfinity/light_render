import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000941 = ({ charityData, id }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const otherChritySplitPercentList = lodash
    .chain(charityData)
    .filter((item) => item?.id !== id && item?.donationPercentage)
    .map((item) => Number(formUtils.queryValue(item.donationPercentage)))
    .value();

  if (!!value) {
    otherChritySplitPercentList.push(Number(formUtils.queryValue(value)));
  }
  const chritySplitPercentSum = lodash.chain(otherChritySplitPercentList).sum().value();
  if (lodash.every(otherChritySplitPercentList) && chritySplitPercentSum > 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000557' }));
  } else {
    callback();
  }
};
