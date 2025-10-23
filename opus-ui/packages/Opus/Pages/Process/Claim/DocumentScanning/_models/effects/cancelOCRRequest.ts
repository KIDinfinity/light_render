import { handleErrorMessageIgnoreXErrorNotice } from "@/utils/commonMessage";
import { cancelOCRRequest as cancelOCR } from '@/services/documentOcrControllerService';

export default function* cancelOCRRequest({ payload }, { call, put }){
  const { requestId } = payload;
  if (!Boolean(requestId)) return;

  const res = yield call(cancelOCR, {
    requestId
  })

  if(!Boolean(res?.success)){
    handleErrorMessageIgnoreXErrorNotice(res);
    return
  }

  yield put({type: 'getOCRResult'})

  yield put({
    type: 'saveSnapShot',
  });

}
