import lodash from 'lodash';
import { getByInsured } from '@/services/c360PolicyInfoControllerV2Service';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';

export default function* ({ payload }: any, { call, put }: any) {
  const { policyNoList, selectColumns } = payload;
  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
  };
  const paramsOfOwner = {
    policyIdList: policyNoList,
    policyId: formUtils.queryValue(policyNoList[0]),
    ...commonParams,
    ...selectColumns,
  };

  const response = yield call(getByInsured, paramsOfOwner);

  if (response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveInsuredListInfo',
      payload: {
        policyOwnerList: response.resultData?.policyOwnerList,
        clientInfoList: response.resultData?.clientInfoList,
        policyBeneficiaryList: response.resultData?.policyBeneficiaryList,
        policyList: response.resultData.policyContractList,
      },
    });
  }
}
