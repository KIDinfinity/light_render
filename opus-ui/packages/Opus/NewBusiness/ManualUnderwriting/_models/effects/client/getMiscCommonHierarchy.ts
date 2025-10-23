import { listAllMiscCommonHierarchyByRegion } from '@/services/pcPlanMiscCommonHierarchyControllerService';
import lodash from 'lodash';

export default function* (_: any, { call, put }: any): Generator<any, void, any> {
  const response = yield call(listAllMiscCommonHierarchyByRegion);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: `saveMiscCommonHierarchy`,
      payload: {
        miscCommonHierarchy: resultData,
      },
    });
  }
}
