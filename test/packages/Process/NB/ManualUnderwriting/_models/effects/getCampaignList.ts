import lodash from 'lodash';
import { searchByRegionCode } from '@/services/miscCampaignControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(searchByRegionCode, {});
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const campaignList = lodash.get(response, 'resultData');
    yield put({
      type: 'saveCampaignList',
      payload: {
        campaignList,
      },
    });
  }
  return response;
}
