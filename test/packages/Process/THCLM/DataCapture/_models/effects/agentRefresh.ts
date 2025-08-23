import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { inquiryByInsured } from '@/services/claimC360PolicyControllerService';

interface IInsured {
  policyId: string;
  insuredId: string;
}

interface IResponse {
  success: string;
  resultData: any;
}

export default function* agentRefresh(_: any, { call, put, select }: any) {
  const insuredInfo: IInsured = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.insured
  ) || {};

  const response: IResponse = yield call(inquiryByInsured, {
    regionCode: tenant.remoteRegion(),
    insured: {
      insuredId: formUtils.queryValue(insuredInfo.insuredId),
      policyId: formUtils.queryValue(insuredInfo.policyId),
    },
  });

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    yield put({
      type: 'savePolicyAgent',
      payload: {
        policyAgent: lodash.find(
          response.resultData.policyAgentList,
          (item = {}) => formUtils.queryValue(insuredInfo.policyId) === item.policyId
        ),
      },
    });
  }
}
