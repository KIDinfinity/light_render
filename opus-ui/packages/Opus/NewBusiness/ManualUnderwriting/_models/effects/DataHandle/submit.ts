import lodash from 'lodash';

import { NAMESPACE } from '../../../activity.config';
import { denormalizeClaimData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';

/**
 * 操作流程
 * 1.校验
 * 2.数据准备
 * 3.反扁平化处理
 * 4.FETOBE转化
 * 5.数据组装
 * 6.请求submit
 * 7.成功处理(成功提示/存sna)
 * 8.更新本地数据
 */

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { formKeys, businessData, confirmBeforeReduce } = payload;

  // 1.校验处理

  const errors: any = yield put.resolve({
    type: 'validateForms',
    payload: { formKeys },
  });
  if (!lodash.isEmpty(errors)) {
    yield put({
      type: 'login/saveLoadingStatus',
      payload: {
        loadingStatus: false,
      },
    });
    yield put({
      type: `${NAMESPACE}/saveIsSaveDataComplete`,
      payload: {
        isSaveDataComplete: true,
      },
    });
    return false;
  }

  if (confirmBeforeReduce) {
    yield put({ type: confirmBeforeReduce });
  }

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
    yield put({
      type: 'getConfirmData',
      payload: {
        businessData: BEDatas,
        ...payload,
        denormalizedData,
      },
    });
  }
  return false;
}
