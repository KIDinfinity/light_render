import lodash from 'lodash';
import { inquiryClient } from '@/services/navigatorCaseOperationControllerService';
export default function* getClientIdList({ payload }: any, { call, select, put }: any) {
  const {
    caseDetail: { currentTaskId, caseCategory, businessNo, insured },
    customerType,
  } = payload || {};

  const { taskId } = yield select(({ processTask }: any) => processTask.getTask) || {};

  const clientIds = lodash.isEmpty(businessNo)
    ? lodash.split(insured, ',')?.map((item) => ({
        keyClientId: item,
        customerType,
      }))
    : [];
  if (lodash.size(clientIds) > 0 && lodash.every(clientIds, (item) => !!item.keyClientId)) {
    return clientIds;
  }

  // 去掉从insuredId去拿信息

  // @ts-ignore
  const response: any = yield call(inquiryClient, {
    businessNo,
    caseCategory,
    taskId: currentTaskId || taskId || '',
    operationType: 'inquiryClient',
  });

  if (
    response?.success &&
    lodash.isPlainObject(response?.resultData) &&
    lodash.isArray(response?.resultData?.businessData?.clientIds)
  ) {
    yield put({
      type: 'saveClientRoles',
      payload: {
        clientRoles: lodash.get(response, 'resultData.businessData.clientRoles', []),
      },
    });
    return lodash.map(response?.resultData?.businessData?.clientIds, (keyClientId: any) => ({
      keyClientId,
      customerType,
      //  暂时注释MDLTH-2289 的故事
      // policyNoList:
      //   lodash
      //     .chain(response?.resultData?.businessData?.policyInfoList)
      //     .find((item) => item.clientId === keyClientId)
      //     .get('policyNoList')
      //     .value() || [],
    }));
  }
  return [];
}
