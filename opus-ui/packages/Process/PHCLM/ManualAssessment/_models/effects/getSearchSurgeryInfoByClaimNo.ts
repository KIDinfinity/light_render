import lodash from 'lodash';
import { searchSurgeryInfoByOriginServiceItemId } from '@/services/claimSurgeryProcedureInformationControllerService';
import { NAMESPACE } from '../../activity.config';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getSearchSurgeryInfoByClaimNo(
  { payload }: any,
  { select, call, put }: any
) {
  const { originServiceItemId } = payload;

  const searchAdjustSurgeryInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchAdjustSurgeryInfo
  );

  if (!searchAdjustSurgeryInfo[originServiceItemId]) {
    const response = yield call(
      searchSurgeryInfoByOriginServiceItemId,
      objectToFormData({ originServiceItemId })
    );

    if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
      // 保存理赔数据
      yield put({
        type: 'saveSearchAdjustSurgeryInfo',
        payload: {
          [originServiceItemId]: response.resultData,
        },
      });
    }

    return response;
  }
}
