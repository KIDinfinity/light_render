import lodash from 'lodash';

import { getTouchResult } from '@/services/navigatorCaseTouchOperationControllerService';

import { NAMESPACE } from '../../../activity.config';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
export default function* ({ payload }: any, { put, select, call }: any): Generator<any, any, any> {
  const { type } = payload;
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  // FETOBE转化
  const BEDatas = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: { ...processData, ...modalData.processData },
      entities: { ...entities, ...modalData.entities },
    },
  });

  if (!lodash.isEmpty(BEDatas)) {
    const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};
    const params = {
      businessData: BEDatas,
      ...lodash.pick(taskDetail, [
        'assignee',
        'businessNo',
        'caseCategory',
        'caseNo',
        'inquiryBusinessNo',
        'companyCode',
        'taskId',
      ]),
      activityKey: taskDetail?.taskDefKey,
      operationType: type,
    };
    const touchId = yield put.resolve({
      type: 'getTouchId',
      payload: {
        params,
      },
    });
    if (!!touchId) {
      while (true) {
        const response = yield getTouchResult({ touchId }, {}, false);
        const responseBusinessData = response?.resultData?.businessData || {};

        if (!lodash.isEmpty(responseBusinessData)) {
          yield put({
            type: `getRiskIndicator`,
            payload: { applicationNo: taskDetail.businessNo },
          });
        }

        if (!lodash.isEmpty(responseBusinessData) || !response?.success) {
          break;
        }

        yield call(delay, 2000);
      }
    }
  }
  return false;
}
