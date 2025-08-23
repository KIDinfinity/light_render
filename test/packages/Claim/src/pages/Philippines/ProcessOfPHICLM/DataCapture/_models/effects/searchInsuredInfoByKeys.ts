import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { CustomerType } from 'claim/enum/Identity';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { call, put }: any) {
  const { searchInsuredObj } = payload;
  const insuredObj = formUtils.formatFlattenValue(formUtils.cleanValidateData(searchInsuredObj));

  const params: any = {
    ...insuredObj,
    customerType: CustomerType.insured,
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
  };
  const response = yield call(identityV2, params);

  yield put({
    type: 'saveInsuredListInfo',
    payload: {
      insuredList: response.resultData,
    },
  });
}
