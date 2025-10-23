import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import { eOperationType } from '@/enum/eOperationType';

export default ({ apiList, businessData, taskDetail }) => {
  const paramsList = [];
  if (lodash.isArray(apiList)) {
    lodash.each(apiList, (item) => {
      const buttonParams = safeParseUtil(item?.buttonParams);
      const curOperationType = buttonParams?.operationType || eOperationType.submit;
      const curParams = {
        businessData,
        ...lodash.pick(taskDetail, [
          // 'activityKey',
          'assignee',
          'businessNo',
          'caseCategory',
          'caseNo',
          'inquiryBusinessNo',
          // TODO：这个字段是否会有
          'companyCode',
          'taskId',
        ]),
        activityKey: taskDetail?.taskDefKey,
        operationType: curOperationType,
      };
      paramsList.push(curParams);
    });
  }
  const finalSubmitParams = {};
  lodash.each(paramsList, (item, index) => {
    finalSubmitParams[index + 1] = item;
  });
  return finalSubmitParams;
};
