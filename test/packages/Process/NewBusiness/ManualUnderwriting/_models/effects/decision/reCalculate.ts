import { notification } from 'antd';
import lodash from 'lodash';
import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }: any, { call, select, put }: any): Generator<any, any, any> {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const modalConverageList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.coverageList
  ) || [];
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const _processData = { ...processData };
  lodash.set(_processData, 'coverageList', modalConverageList);
  const BEDatas: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: _processData,
      entities,
    },
  });

  if (!lodash.isEmpty(BEDatas)) {
    const businessData: any = yield put.resolve({
      type: 'getBusinessData',
      payload: {
        businessData: BEDatas,
        ...payload,
      },
    });

    if (!!businessData && !lodash.isEmpty(businessData)) {
      yield put({
        type: 'updateCoverage',
        payload: {
          businessData,
        },
      });

      // TODO:这里需要国际化
      notification.success({
        message: 'recalculate success',
      });
    }

    return true;
  }
}
