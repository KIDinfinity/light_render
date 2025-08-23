import { getCrpdPreviewSimpleAttachFileList } from '@/services/mcCorrespondenceControllerService';
import lodash from 'lodash';

export default function* getEnclosureData(action: any, { call, select, put }: any) {
  const passCheck = action?.payload?.passCheck;
  const { previewEnclosure, previewSelectLetter, previewModeData } = yield select(
    ({ envoyController }: any) => ({
      previewSelectLetter: envoyController.previewSelectLetter,
      previewModeData: envoyController.previewModeData,
      previewEnclosure: envoyController.previewEnclosure,
    })
  );
  if (lodash.isEmpty(previewEnclosure?.[previewSelectLetter]) || passCheck) {
    const params = previewModeData?.letters?.[previewSelectLetter]?.originalSendParam;
    // @ts-ignore
    const response: any = yield call(getCrpdPreviewSimpleAttachFileList, params);

    if (response.success && response.resultData) {
      yield put({
        type: 'saveEnclosureData',
        payload: {
          previewEnclosure: { [previewSelectLetter]: response.resultData },
        },
      });
    }
  }
}
