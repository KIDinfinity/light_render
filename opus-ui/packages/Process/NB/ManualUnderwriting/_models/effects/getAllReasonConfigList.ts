import { serialize as objectToFormData } from 'object-to-formdata';
import { getAllReasonConfigList } from '@/services/miscCfgInquiryControllerService';

export default function* (_, { call, put }: any) {
  const allReasonConfigList = yield call(getAllReasonConfigList, objectToFormData({}));
  yield put({
    type: 'setAllReasonConfigList',
    payload: {
      allReasonConfigList,
    },
  });
}
