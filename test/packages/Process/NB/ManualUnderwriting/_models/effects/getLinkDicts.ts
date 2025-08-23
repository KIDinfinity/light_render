import lodash from 'lodash';
import { miscCommonHierarchyLinkCommon } from '@/services/miscCommonHierarchyLinkControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }, { call, put, select }: any) {
  const { parentCode, parentFieldName } = payload;
  const isExist = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.linkDicts?.[`${parentFieldName}-${parentCode}`]
  );
  if (isExist) {
    return isExist;
  }
  const response = yield call(miscCommonHierarchyLinkCommon, {
    parentCode,
    parentFieldName,
  });

  const { success, resultData = [] } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setLinkDicts',
      payload: {
        typeCode: `${parentFieldName}-${parentCode}`,
        dicts: resultData,
      },
    });
    return resultData;
  }
}
