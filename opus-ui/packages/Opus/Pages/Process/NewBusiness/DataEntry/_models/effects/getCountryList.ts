import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { getAddressSubListV2 } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { select, call, put }: any): any {
  const countryList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.countryList
  ) || [];

  if (lodash.isEmpty(countryList)) {
    const response = yield call(getAddressSubListV2);
    if (!lodash.isEmpty(response)) {
      yield put({
        type: 'saveCountryList',
        payload: {
          list: response,
        },
      });
    }
  }
}
