import { combineDataDtl } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import { companyCodeHandler } from 'configuration/utils';

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
        fieldName: 'user_id',
        firstFieldValue: previewRecord?.user_id,
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    const list = companyCodeHandler.toFE(response.resultData);
    yield put({
      type: 'savePreview',
      payload: {
        previewRecord: list?.[0] || {},
      },
    });
    yield put({
      type: 'savePreviewMap',
      payload: {
        previewRecord: list?.[0] || {},
        id: previewRecord?.image_id,
      },
    });
  }
}
