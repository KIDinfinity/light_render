import c360PopUpInfoControllerService from '@/services/c360PopUpInfoControllerService';
import lodash from 'lodash';

export default function* getPopUpInfo({ payload }: any, { call, put }: any) {
  const { clientId } = payload;
  const response = yield call(c360PopUpInfoControllerService.findPopUpInfo, clientId);
  if (response.success && response.resultData) {
    const { popUpInfoList } = lodash.pick(response.resultData, 'popUpInfoList');
    // 保存理赔数据
    yield put({
      type: 'savePartyListInfo',
      payload: { popUpPolicyInfoList: popUpInfoList },
    });
  }
  return response;
}
