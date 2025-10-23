import lodash from 'lodash';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import { SaveType } from '../../Enum';

/**
 * @param {String} object.payload.taskId
 */
export default function* ({ payload }: any, { put, call }: any) {
  const response = yield call(
    getTask,
    {
      taskId: payload?.taskId,
      dataType: 'mainPage',
      skipSnapshot: true,
    },
    { localCache: false }
  );
  const businessData = lodash.get(response, 'resultData.businessData', {});
  if (payload?.saveType === SaveType.basic) {
    const basicInforData = lodash.omit(businessData, ['claimHospitalBillingDetails']);
    yield put({
      type: 'saveBasicInforData',
      payload: {
        basicInforData,
      },
    });
  }
  if (!payload?.saveType) {
    yield put({
      type: 'getHospitalBillingByClaimNoData',
      payload: {
        businessData,
      },
    });
  }
}
