import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import lodash from 'lodash';
import DistributionChannelDisplayMethod from 'process/NewBusiness/Enum/DistributionChannelDisplayMethod';

export default function* ({ payload }: { payload: { region: string } }, { call, put }: any) {
  const { region } = payload;
  const response = yield call(getGlobalConfig, {
    codeType: 'DistributionChannelDisplayMethod',
    region,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const displayMethod = lodash.get(
      response,
      'resultData[0].defaultValue',
      DistributionChannelDisplayMethod.AC
    );
    yield put({
      type: 'setDistributionChannelDisplayMethod',
      payload: {
        displayMethod,
      },
    });
  }
  return response;
}
