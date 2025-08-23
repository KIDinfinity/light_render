import { businessDataBEToFE } from '@/services/gotConvertService';
import lodash from 'lodash';

export default function* ({ payload }: any, { put, call }: any): Generator<any, any, any> {
  const { businessData } = payload;
  const response = yield call(businessDataBEToFE, { requestData: { ...businessData } });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    !lodash.isEmpty(response?.responseData)
  ) {
    // 更新converageList
    yield put({
      type: 'updateModalCoverageList',
      payload: {
        coverageList: response?.responseData?.coverageList,
      },
    });

    return true;
  }
}
