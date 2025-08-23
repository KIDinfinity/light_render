import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getCitiesByCountry } from '@/services/miscCfgInquiryControllerService';
export default function* (_: any, { call, put }: any) {
  const response = yield call(getCitiesByCountry, objectToFormData({ countryCode: 'RP' }));

  if (!lodash.isEmpty(response)) {
    yield put({
      type: 'setAllAddressSubList',
      payload: {
        allAddressSubList: lodash.map(response, (el: any) => ({
          dictName: el.subName,
          dictCode: el.subCode,
        })),
      },
    });
  }
}
