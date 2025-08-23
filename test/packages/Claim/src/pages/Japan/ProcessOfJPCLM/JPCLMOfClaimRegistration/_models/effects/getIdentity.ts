import { tenant } from '@/components/Tenant';
import { CustomerType } from 'claim/enum/Identity';
import { BusinessCode } from 'claim/enum/BusinessCode';
import c360PartyInfoControllerService from '@/services/c360PartyInfoControllerService';
import lodash from 'lodash';

export default function* getIdentity({ payload }: any, { call, put }: any) {
  const submitData = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    customerType: CustomerType.insured,
    ...payload,
  };
  const response = yield call(c360PartyInfoControllerService.identityV2, submitData);
  yield put({
    type: 'saveIdentityParams',
    payload: submitData,
  });
  if (response.success && response.resultData) {
    const list = lodash.map(response.resultData, (item: any) => ({
      address: lodash.get(item, 'address'),
      postCode: lodash.get(item, 'postCode'),
      phoneNo: lodash.get(item, 'phoneNo'),
      policyNo: '',
      insuredId: lodash.get(item, 'clientId'),
      partyId: item?.partyId,
    }));
    yield put({
      type: 'saveInsuredList',
      payload: list,
    });
    if (lodash.size(list) === 1) {
      const temp = list[0];
      yield put({
        type: 'saveInsured',
        payload: {
          changedFields: lodash.pick(temp, [
            'address',
            'postCode',
            'phoneNo',
            'insuredId',
            'partyId',
          ]),
        },
      });
      yield put({
        type: 'queryListPolicy',
        payload: {
          insuredId: lodash.get(temp, 'insuredId'),
        },
      });
    }
    return lodash.size(list) === 1 ? list?.[0] : {};
  }
  return {};
}
