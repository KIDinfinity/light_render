import { combineDataDtl } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default function* ({ payload }: any, { call, put, select }: any) {
  const currentMenu = yield select((state: any) => state.configurationController?.currentMenu);
  const { previewRecord } = payload;
  const response = yield call(combineDataDtl, {
    functionId: currentMenu?.id,
    caseNo: previewRecord?.case_no,
    imageId: previewRecord?.image_id,
    page: {
      currentPage: 1,
      pageSize: 10,
    },
    whereConditions: [
      {
        fieldName: 'group_code',
        firstFieldValue: previewRecord?.group_code,
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'savePreview',
      payload: {
        previewRecord: response.resultData?.[0] || {},
      },
    });
    yield put({
      type: 'getUserList',
      payload: {
        group_code: response.resultData?.[0]?.data?.group_code,
      },
    });
  }
}
