import { getCrpdPreviewSimpleAttachFileList } from '@/services/mcCorrespondenceControllerService';

export default function* getEnclosureData(action: any, { call, select, put }: any) {
  const { originalSendParam, id, letterIndex, title } = action?.payload;
  // const passCheck = action?.payload?.passCheck;
  // const { titlelist, previewSelectLetter, previewModeData } = yield select(
  //   ({ envoyController }: any) => ({
  //     titlelist: envoyController.titlelist,
  //     previewModeData: envoyController.previewModeData,
  //     previewEnclosure: envoyController.previewEnclosure,
  //   })
  // );
  // if (lodash.isEmpty(previewEnclosure?.[previewSelectLetter]) || passCheck) {
  // const params = enclosureData?.letters?.[previewSelectLetter]?.originalSendParam;
  const response: any = yield call(getCrpdPreviewSimpleAttachFileList, originalSendParam);
  if (response.success && response.resultData) {
    yield put({
      type: 'saveEnclosureData',
      payload: {
        id,
        letterIndex,
        previewEnclosure: response.resultData,
      },
    });
  }

  // }
}
