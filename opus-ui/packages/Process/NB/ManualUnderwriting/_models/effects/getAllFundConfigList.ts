import { serialize as objectToFormData } from 'object-to-formdata';
import { getAllFundConfigList } from '@/services/miscCfgInquiryControllerService';

export default function* (_, { call, put }: any) {
  const allFundConfigList = yield call(getAllFundConfigList, objectToFormData({}));
  yield put({
    type: 'setAllFundConfigList',
    payload: {
      allFundConfigList,
    },
  });
}
