import lodash from 'lodash';
import { denormalizeClaimData } from 'process/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { NAMESPACE } from '../../../activity.config';

/**
 * 操作流程
 * 1.校验
 * 1.反扁平化处理
 * 2.FETOBE转化
 * 3.数据组装
 * 4.请求submit
 * 5.成功处理(成功提示/存sna)
 * 6.更新本地数据
 */

export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { formKeys, businessData, setOverdueTime, overdueTimedispatch } = payload;

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
    return false;
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
        setOverdueTime,
        overdueTimedispatch,
      },
    });
  }
  return false;
}
