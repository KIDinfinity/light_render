import lodash from 'lodash';
import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* initCompareClaimData({ payload }: any, { put, call, select }: any) {
  const { claimData, taskId } = lodash.pick(payload, ['claimData', 'taskId']) || {};

  let compareClaimData: any = {};
  if (!lodash.isEmpty(claimData)) {
    compareClaimData = claimData;
  } else {
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: true,
      taskId,
    });

    const { resultData, success } = response || {};
    if (success && resultData) {
      compareClaimData = resultData?.businessData;

      // 保存理赔原始数据
      yield put({
        type: 'originClaimProcessData',
        payload: resultData,
      });
    }
  }
  yield put({
    type: 'claimCaseController/saveComparedClaimData',
    payload: {
      comparedClaimData: compareClaimData,
      comparedClaimCreateNormalizeData: compareClaimData,
    },
  });

  return compareClaimData;
}
