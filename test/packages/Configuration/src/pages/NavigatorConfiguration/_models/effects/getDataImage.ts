import { getDataImageById } from '@/services/ccJpDataImageControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const { image_id } = payload;
  const response = yield call(getDataImageById, { image_id });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveDataImage',
      payload: {
        dataImage: response?.resultData,
      },
    });
  }
}
