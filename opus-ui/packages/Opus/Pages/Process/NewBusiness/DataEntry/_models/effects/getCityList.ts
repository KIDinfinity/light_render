import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';

export default function* (action: any, { select, call, put }: any): any {
  const values = lodash.get(action, 'payload.values', []);

  const cityDict = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cityDict);

  const parentCodes = lodash
    .chain(values)
    .compact()
    .uniq()
    .filter((item) => !lodash.has(cityDict, item))
    .value();

  if (!lodash.isEmpty(parentCodes)) {
    const allCities: any = {};
    for (const code of parentCodes) {
      const response = yield call(getAddressSubListV3, { parentCode: code });
      if (!lodash.isEmpty(response)) {
        allCities[code] = response;
      }
    }

    yield put({
      type: 'saveCityList',
      payload: {
        cityDict: allCities,
      },
    });
  }
}
