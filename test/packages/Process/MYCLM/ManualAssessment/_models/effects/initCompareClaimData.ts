import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import saveClaimProcessData from '../reducers/saveClaimProcessData';

export default function* initCompareClaimData({ payload }: any, { put, call, select }: any) {
  const { claimData, taskId } = lodash.pick(payload, ['claimData', 'taskId']) || {};
  console.log('我进来了');
  let compareClaimData: any = {};
  if (!lodash.isEmpty(claimData)) {
    compareClaimData = saveClaimProcessData({}, { payload: claimData });
  } else {
    // const taskId = yield select((state: any) => state?.processTask?.getTask?.taskId);
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: true,
      taskId,
    });

    const { resultData, success } = response || {};
    if (success && resultData) {
      compareClaimData = saveClaimProcessData({}, { payload: resultData?.businessData });
    }
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

  return compareClaimData;
}
