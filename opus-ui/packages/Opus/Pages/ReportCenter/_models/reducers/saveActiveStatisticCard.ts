import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { groupByField, summaryBy, summaryMethod, statisticName, statisticCode } = payload;
  return {
    ...state,
    covariance: {
      groupByField: lodash.split(groupByField, ','),
      summaryBy: formUtils.queryValue(summaryBy) === '*' ? '' : summaryBy,
      summaryMethod,
      statisticName,
    },
    statisticCode,
  };
};
