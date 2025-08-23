import { getByInsured } from '@/services/c360PolicyInfoControllerV2Service';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import lodash from 'lodash';

export default function* ({ payload }: any, { call, put }: any) {
  const { policyNoList, selectColumns } = payload;
  const commonParams = {
    regionCode: tenant.region(),
    businessCode: BusinessCode.claim,
  };
  const paramsOfPolicy = {
    ...commonParams,
    policyIdList: policyNoList,
    policyId: formUtils.queryValue(policyNoList[0]),
    ...selectColumns,
  };
  const response = yield call(getByInsured, paramsOfPolicy);

  if (response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveInsuredListInfo',
      payload: {
        policyList: response.resultData.policyContractList,
      },
    });
    yield put({
      type: 'saveIssueAge',
    });
  }
}
