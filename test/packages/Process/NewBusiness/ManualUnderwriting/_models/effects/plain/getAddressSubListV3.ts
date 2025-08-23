import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { AddressRegionMapping } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_utils';

export default function* ({ payload }: any, { call, put }: any) {
  const { parentCode = '', addressLevel = '' } = payload || {};
  const addressSubList = yield call(getAddressSubListV3, { parentCode });

  if (!lodash.isEmpty(addressSubList) && !lodash.isEmpty(addressLevel)) {
    yield put({
      type: `${NAMESPACE}/saveParentCodeAddress`,
      payload: {
        parentCode: parentCode,
        addressLevel: AddressRegionMapping()[addressLevel],
        list: addressSubList,
      },
    });
  }
  return addressSubList;
}
