import { isEmpty, pickBy, isNil } from 'lodash';
import lodash from 'lodash';
/**
 * 参数里有caseNo, taskId
 *    与taskDetail一致， 用taskDetail
 *    不一致， 用参数
 * 参数没有， 用businessData
 */
export default (requestOptions: any, params: any) => {
  let headers = {};
  const taskId = params?.taskId || params?.currentTaskId;
  const caseNo =
    params?.caseNo || params?.processInstanceId || params?.procInstId || params?.caseId;

  const taskDetail = lodash.pick(window.history.state, [
    'caseNo',
    'caseCategory',
    'activityKey',
    'taskId',
    'businessNo',
    'inquiryBusinessNo',
    'processInstanceId',
    'currentTaskId',
    'companyCode',
  ]);

  const options = {
    ...(taskId ? { taskId } : {}),
    ...(caseNo ? { caseNo } : {}),
    ...(taskDetail?.companyCode ? { companyCode: taskDetail?.companyCode } : {}),
    caseCategory: taskDetail?.caseCategory || '',
  };

  const businessData = !isEmpty(taskDetail)
    ? {
        caseNo: taskDetail?.caseNo || taskDetail?.processInstanceId,
        caseCategory: taskDetail?.caseCategory,
        activity: taskDetail?.activityKey,
        taskId: taskDetail?.taskId || taskDetail?.currentTaskId,
        businessNo: encodeURI(taskDetail?.businessNo) || taskDetail?.businessNo,
        inquiryBusinessNo: encodeURI(taskDetail?.inquiryBusinessNo),
        ...(taskDetail?.companyCode ? { companyCode: taskDetail?.companyCode } : {}),
      }
    : {};
  if (
    !isEmpty(options) &&
    ((options?.taskId &&
      businessData?.taskId &&
      lodash.toString(options?.taskId) !== lodash.toString(businessData?.taskId)) ||
      (options?.caseNo &&
        businessData?.caseNo &&
        lodash.toString(options?.caseNo) !== lodash.toString(businessData?.caseNo)))
  ) {
    headers = options;
  } else if (!isEmpty(businessData)) {
    headers = businessData;
  }

  return {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      ...pickBy(headers, (el: any) => !isNil(el) && el !== ''),
    },
  };
};
