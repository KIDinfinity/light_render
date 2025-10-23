import lodash from 'lodash';
import { miscCommonHierarchyLinkCommon } from '@/services/miscCommonHierarchyLinkControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const { parentCode, parentFieldName } = payload;
  const response = yield call(miscCommonHierarchyLinkCommon, {
    parentCode,
    parentFieldName,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setOccupationCodeDropdown',
      payload: {
        occupationCodeDicts: lodash
          .chain(resultData)
          .filter((item) => {
            return item?.dictCode && item?.dictName;
          })
          .value(),
      },
    });
  }
}
