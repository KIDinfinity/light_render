import { ocrExtraction } from '@/services/documentOcrControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidV4 } from 'uuid';

export default function* getOCRResult({ payload }, { call, take, put }) {
  if (!payload) return;

  const { filesForOCR, inquiryBusinessNo, businessNo, activityKey, caseNo, taskId, caseCategory } =
    payload;

  if (!filesForOCR?.length) return;

  const uploadFiles = filesForOCR.map(({ documentFileId, fileId }: any) => {
    // TODO: Tempo patch for ocrExtraction request
    const docTypeName = documentFileId?.locale_new
      ? documentFileId?.locale_new?.split('-')?.[1]
      : documentFileId;
    return {
      docDataId: fileId,
      docTypeName,
    };
  });

  const requestId = uuidV4()

  yield put({ type: 'saveOCRRequestId', payload: { requestId } })

  const result = yield call(ocrExtraction, {
    inquiryBusinessNo,
    businessNo,
    activityKey,
    caseNo,
    taskId,
    caseCategory,
    fileData: formUtils.cleanValidateData(uploadFiles),
    requestId
  });
  if (result?.success) {
    const { payload: response } = yield take('opusDocumentScanning/OCRResultReceived');
    const ocrResultList = response?.data;
    if (Array.isArray(ocrResultList))
      ocrResultList.forEach((v) => {
        if (!Boolean(v?.success)) {
          handleErrorMessageIgnoreXErrorNotice(v);
        }
      });
    yield put({
      type: 'saveOCRResult',
      payload: {
        ocrResultList,
      },
    });
  }

  yield put({
    type: 'saveSnapShot',
  });
}
