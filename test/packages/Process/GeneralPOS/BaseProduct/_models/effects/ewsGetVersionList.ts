import lodash from 'lodash';
import { getEws } from '@/services/posEwsControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const businessNo = lodash.get(payload, 'businessNo');
  const response = yield call(getEws, businessNo);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setEwsData',
      payload: {
        ewsData: resultData.map((item) => ({
          ...item,
          businessData: {
            ...item.businessData,
            ...item.businessData.taskInfo,
            caseCategory: 'BP_POS_CTG001',
            activityKey: 'BP_POS_ACT002',
            taskDefKey: 'BP_POS_ACT002',
          },
        })),
      },
    });
    yield put({
      type: 'setCurrentEwsDataIndex',
      payload: {
        index: 0,
      },
    });
    window.history.replaceState({ ...(resultData?.[0]?.businessData || {}), businessNo }, '');
  }
}
