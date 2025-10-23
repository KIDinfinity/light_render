import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { getAddressSubListV2 } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { select, call, put }: any): any {
  const allAddressList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.allAddressList
  ) || [];

  if (lodash.isEmpty(allAddressList)) {
    const response = yield call(getAddressSubListV2);

    if (!lodash.isEmpty(response)) {
      yield put({
        type: 'saveParentCodeAddress',
        payload: {
          addressLevel: 'country',
          list: response,
        },
      });
    }
  }
}
