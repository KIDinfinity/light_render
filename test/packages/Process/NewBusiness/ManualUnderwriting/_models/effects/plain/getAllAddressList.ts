import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { select, call, put }: any): any {
  const allAddressList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.allAddressList
  ) || [];

  if (lodash.isEmpty(allAddressList)) {
    const response = yield call(getAddressSubListV3);

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
