import lodash from 'lodash';
import { miscCommonHierarchyLinkCommonMultiple } from '@/services/miscCommonHierarchyLinkMultipleControllerService';
import { filterDataByLanguage } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }, { call, put, select }: any) {
  const { parentCode, parentFieldName } = payload;
  const isExist = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.linkMultipleDicts?.[`${parentFieldName}-${parentCode}`]
  );
  if (isExist) {
    return isExist;
  }
  const response = yield call(miscCommonHierarchyLinkCommonMultiple, {
    parentCode,
    parentFieldName,
  });

  const { success, resultData = [] } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    const filterData = filterDataByLanguage(resultData);
    yield put({
      type: 'setLinkMultipleDicts',
      payload: {
        typeCode: `${parentFieldName}-${parentCode}`,
        dicts: filterData,
      },
    });
    return filterData;
  }
}
