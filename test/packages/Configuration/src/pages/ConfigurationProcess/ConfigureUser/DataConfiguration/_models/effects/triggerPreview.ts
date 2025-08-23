import { getVersionDataDetail } from '@/services/ccJpDataImageControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { previewRecord } = payload;
  const currentMenu = yield select((state: any) => state.configurationController?.currentMenu);
  const previewMap = yield select((state: any) => state.configureUserController?.previewMap);
  if (previewMap[previewRecord?.image_id]) {
    yield put({
      type: 'savePreview',
      payload: {
        previewRecord: previewMap[previewRecord?.image_id],
      },
    });
    return;
  }

  const response = yield call(getVersionDataDetail, {
    functionId: currentMenu?.id,
    imageId: previewRecord?.image_id,
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'savePreviewMap',
      payload: {
        previewRecord: response.resultData?.[0] || {},
        id: previewRecord?.image_id,
      },
    });
    yield put({
      type: 'savePreview',
      payload: {
        previewRecord: response.resultData?.[0] || {},
      },
    });
  }
}
