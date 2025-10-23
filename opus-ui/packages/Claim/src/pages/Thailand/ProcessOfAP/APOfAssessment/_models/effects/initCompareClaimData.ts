import { denormalizeClaimData } from '@/utils/claimUtils';
import { serialize as objectToFormData } from 'object-to-formdata';
import saveClaimProcessData from '../reducers/saveClaimProcessData';
import { getClaimAssessment } from 'claim/pages/Thailand/ProcessOfDA/flowConfig';

export default function* initCompareClaimData({ payload }: any, { put, call, select }: any) {
  const { claimData, businessData } = payload;
  let compareClaimData: any = {};
  if (businessData) {
    const { caseCategory, businessNo: claimNo } = yield select(
      (state: any) => state.processTask.getTask
    );
    const response = yield call(
      getClaimAssessment[caseCategory],
      objectToFormData({ claimNo, caseCategory })
    );

    const { resultData, success } = response || {};
    if (success && resultData) {
      compareClaimData = saveClaimProcessData({}, { payload: resultData });
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

  return compareClaimData;
}
