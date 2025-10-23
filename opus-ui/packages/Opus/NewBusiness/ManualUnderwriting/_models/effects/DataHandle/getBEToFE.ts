import convert_businessDataBEToFE from 'opus/Utils/convert_businessDataBEToFE';
import { tenant } from '@/components/Tenant';

import lodash from 'lodash';

const HANDLETYPE = {
  initSustainability: 'initSustainability',
};

export default function* ({ payload }: any, { put, call }: any): Generator<any, any, any> {
  const { businessData, needUpdataModal, handleType } = payload;
  try {
    const responseData = convert_businessDataBEToFE({ requestData: { ...businessData } }, tenant.region());
    yield put({
      type: 'saveProcessData',
      payload: {
        businessData: responseData,
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
          visible: lodash.some(responseData?.sustainabilityOptions, (item) => item.sustainable === 'Y'),
        },
      });
    }
    return true;
  } catch (err) {}
}
