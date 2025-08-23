import { denormalizeClaimData } from '@/utils/claimUtils';
import saveClaimProcessData from '../reducers/saveClaimProcessData';
import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* initCompareClaimData({ payload }: any, { put, call, select }: any) {
  const { claimData, businessData } = payload;

  let compareClaimData: any = {};
  if (businessData) {
    const taskId = yield select(
      (state: any) => state?.processTask?.getTask?.taskId
    );
    const response = yield call(
      getTask,
      {
        dataType: 'mainPage',
        skipSnapshot: true,
        taskId
      }
    );

    const { resultData, success } = response || {};
    if (success && resultData) {
      compareClaimData = saveClaimProcessData({}, { payload: resultData?.businessData });
    }
  } else if (claimData) {
    compareClaimData = saveClaimProcessData({}, { payload: claimData });
  }

  const { claimProcessData, claimEntities } = compareClaimData;

  // 反扁平化
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  // 保存理算后的最新数据到claimCaseController以供对比使用
  yield put({
    type: 'claimCaseController/saveComparedClaimData',
    payload: {
      comparedClaimData: denormalizedData,
    },
  });

  yield put({
    type: 'saveOriginClaimEntities',
    payload: {
      originClaimEntities: claimEntities
    }
  })

  return compareClaimData;
}
