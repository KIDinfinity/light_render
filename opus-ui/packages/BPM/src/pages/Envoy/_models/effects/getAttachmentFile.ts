import { checkPreviewAttachFileExist } from '@/services/mcCorrespondenceControllerService';

export default function* getAttachmentFile({ payload }: any, { call, select, put }: any) {
  const { index } = payload;
  const { previewEnclosure, previewSelectLetter, previewSelectEnclosureIndex } = yield select(
    ({ envoyController }: any) => ({
      previewSelectLetter: envoyController.previewSelectLetter,
      previewEnclosure: envoyController.previewEnclosure,
      previewSelectEnclosureIndex: envoyController.previewSelectEnclosureIndex,
    })
  );
  if (index !== previewSelectEnclosureIndex) {
    const params = previewEnclosure?.[previewSelectLetter][index];
    // @ts-ignore
    const checkResponse: any = yield call(checkPreviewAttachFileExist, params);

    if (!checkResponse?.resultData) {
      yield put.resolve({
        type: 'getEnclosureData',
        payload: { passCheck: true },
      });
    }

    yield put({
      type: 'saveSelectEnclosureIndex',
      payload: {
        index,
      },
    });
  }
}
