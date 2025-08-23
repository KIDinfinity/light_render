import lodash from 'lodash';
import miscCommonHierarchyLinkControllerService from '@/services/miscCommonHierarchyLinkControllerService';

export default function* getRoomTypeDict({ payload }: any, { call, put }: any) {
  const { hospitalType, treatmentId, isFirst } = payload;

  if (!isFirst) {
    yield put({
      type: 'clearRoomType',
      payload: {
        treatmentId,
      },
    });
  }

  const response = yield call(
    miscCommonHierarchyLinkControllerService.miscCommonHierarchyLinkCommon,
    {
      parentCode: hospitalType,
      parentFieldName: 'Dropdown_CLM_HospitalType',
    }
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveRoomTypeDict',
      payload: {
        roomTypeDict: resultData
          ? resultData.map((item: any) => ({
              dictCode: item.dictCode,
              dictName: item.dictName,
            }))
          : [],
      },
    });
  }
}
