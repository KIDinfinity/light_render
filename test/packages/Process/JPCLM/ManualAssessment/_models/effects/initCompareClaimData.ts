import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import saveClaimProcessData from '../reducers/saveClaimProcessData';

export default function* initCompareClaimData({ payload }: any, { put, call, select }: any) {
  const { claimData, taskId } = lodash.pick(payload, ['claimData', 'taskId']) || {};

  let compareClaimData: any = {};
  if (!lodash.isEmpty(claimData)) {
    compareClaimData = saveClaimProcessData({}, { payload: claimData });
  } else {
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: true,
      taskId,
    });

    const { resultData, success } = response || {};
    if (success && resultData) {
      compareClaimData = saveClaimProcessData({}, { payload: resultData?.businessData });

      // 保存理赔原始数据
      yield put({
        type: 'originClaimProcessData',
        payload: resultData,
      });
    }
  }

  // (TODO:这个方法可能要去掉，因为用下面的数据)保存理算后的最新数据到claimCaseController以供对比使用
  const { claimProcessData, claimEntities } = compareClaimData;

  // 反扁平化
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  yield put({
    type: 'claimCaseController/saveComparedClaimData',
    payload: {
      comparedClaimData: denormalizedData,
      comparedClaimCreateNormalizeData: compareClaimData,
    },
  });

  return compareClaimData;
}
