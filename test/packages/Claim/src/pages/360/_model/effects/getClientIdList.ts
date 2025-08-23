import lodash from 'lodash';
import { inquiryClient } from '@/services/navigatorCaseOperationControllerService';
export default function* getClientIdList(_: any, { call, select }: any) {
  // @ts-ignore
  const { insuredId, businessNo, caseCategory, customerType } = yield select(
    ({ insured360 }: any) => insured360?.taskInfo
  ) || {};
  const { taskId } = yield select(({ processTask }: any) => processTask.getTask) || {};

  const clientIds = lodash.isEmpty(businessNo)
    ? lodash.split(insuredId, ',')?.map((item) => ({
        keyClientId: item,
        customerType,
      }))
    : [];
  if (lodash.size(clientIds) > 0 && lodash.every(clientIds, (item) => !!item.keyClientId)) {
    return clientIds;
  }

  // @ts-ignore
  const response: any = yield call(inquiryClient, {
    businessNo: businessNo,
    caseCategory,
    taskId,
    operationType: 'inquiryClient',
  });

  if (
    response?.success &&
    lodash.isPlainObject(response?.resultData) &&
    lodash.isArray(response?.resultData?.businessData?.clientIds)
  ) {
    return lodash.map(response?.resultData?.businessData?.clientIds, (keyClientId: any) => ({
      keyClientId,
      customerType,
      policyNoList:
        lodash
          .chain(response?.resultData?.businessData?.policyInfoList)
          .find((item) => item.clientId === keyClientId)
          .get('policyNoList')
          .value() || [],
    }));
  }
  return [];
}
