import lodash from 'lodash';
import formUtils from 'basic/components/Form/formUtils';

export const VLD_000701 = ({ agentData, id }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const otherCommissionSplitPercentList = lodash
    .chain(agentData)
    .filter((item) => item?.id !== id && item?.commissionSplitPercent)
    .map((item) => Number(formUtils.queryValue(item.commissionSplitPercent)))
    .value();
  if (!!value) {
    otherCommissionSplitPercentList.push(Number(formUtils.queryValue(value)));
  }
  const commissionSplitPercentSum = lodash.chain(otherCommissionSplitPercentList).sum().value();
  if (commissionSplitPercentSum !== 100) {
    callback('Commission Split% must be 100%');
  } else {
    callback();
  }
};
