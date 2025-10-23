import lodash from 'lodash';

import { address } from '@/services/miscAddressInformationControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(address, { countryCode: payload?.countryCode });
  const provinces = response?.resultData?.province;
  if (!lodash.isEmpty(provinces)) {
    yield put({
      type: 'setAllAddressSubList',
      payload: {
        allAddressSubList: lodash.map(provinces, (el: any) => ({
          dictName: el.description,
          dictCode: el.code,
        })),
      },
    });
  }
  return;
}
