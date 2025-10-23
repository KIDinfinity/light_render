import lodash from 'lodash';

import { NAMESPACE } from '../../../activity.config';
import { denormalizeClaimData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';

export default function* ({ payload }: any, { put, select, call }: any): Generator<any, any, any> {
  // const list = yield select(
  //   ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.clientInfoList,
  //   shallowEqual
  // );
  // const list = yield select(
  //   ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.clientInfoList,
  //   shallowEqual
  // );
  const { formKeys, businessData } = payload;

  // 1.校验处理

  const errors: any = yield put.resolve({
    type: 'validateForms',
    payload: { formKeys },
  });
  if (!lodash.isEmpty(errors)) {
    return false;
  }
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail
  );
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const denormalizedData = denormalizeClaimData(
    { ...processData, ...modalData.processData },
    { ...entities, ...modalData.entities }
  );
  // 2.FETOBE转化
  const BEDatas: any =
    !!businessData && !lodash.isEmpty(businessData)
      ? businessData
      : yield put.resolve({
          type: 'getFEToBE',
          payload: {
            processData: { ...processData, ...modalData.processData },
            entities: { ...entities, ...modalData.entities },
          },
        });
  if (!lodash.isEmpty(BEDatas)) {
    const snapshotResponse = yield put.resolve({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: BEDatas,
      },
    });
    if (snapshotResponse.success) {
      yield put({
        type: `${NAMESPACE}/saveProcessData`,
        payload: {
          businessData: denormalizedData,
          taskDetail,
        },
      });
    }
  }
  return false;
}
