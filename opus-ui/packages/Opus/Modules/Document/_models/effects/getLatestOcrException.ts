import lodash from 'lodash';
import documentOcrControllerService from '@/services/documentOcrControllerService';

export default function* getLatestOcrException({ payload }: any, { call, put }: any) {
  const { caseNo } = payload;
  const response = yield call(documentOcrControllerService.getLatestOcrException, {
    caseNo,
  });

  if (
    !response?.success &&
    lodash.isArray(response?.promptMessages) &&
    !lodash.isEmpty(response?.promptMessages)
  ) {
    yield put({
      type: 'saveOcrErrors',
      payload: {
        ocrErrors: [
          {
            code: '1',
            content: 'OCR result is abnormal, please check OCR Result for more information.',
          },
        ],
        // ocrErrors: lodash.map(response?.promptMessages, (el: any, idx: number) => ({
        //   code: idx,
        //   content: 'OCR result is abnormal, please check OCR Result for more information.',
        //   // content: el.code,
        // })),
      },
    });
  }
}
