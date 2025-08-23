import { businessDataBEToFE } from '@/services/gotConvertService';
import lodash from 'lodash';

const HANDLETYPE = {
  initSustainability: 'initSustainability',
};

export default function* ({ payload }: any, { put, call }: any): Generator<any, any, any> {
  const { businessData, needUpdataModal, handleType } = payload;
  const response = yield call(businessDataBEToFE, { requestData: { ...businessData } });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    !lodash.isEmpty(response?.responseData)
  ) {
    yield put({
      type: 'saveProcessData',
      payload: {
        businessData: response?.responseData,
      },
    });
    yield put({
      type: 'saveBizDataV2',
      payload: {
        businessData: businessData,
      },
    });
    if (needUpdataModal) {
      yield put({
        type: 'saveShowModal',
        payload: {},
      });
    }

    if (handleType === HANDLETYPE.initSustainability) {
      yield put({
        type: 'initSustainability',
      });
      yield put({
        type: 'setSustainabilityModalVisible',
        payload: {
          visible: lodash.some(
            response?.responseData?.sustainabilityOptions,
            (item) => item.sustainable === 'Y'
          ),
        },
      });
    }
    return true;
  }
}
