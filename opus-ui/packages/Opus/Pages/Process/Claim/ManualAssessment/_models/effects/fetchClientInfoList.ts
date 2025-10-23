import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* fetchClientInfoList(_: any, { call, put, select }: any) {
  const insuredInfo = yield select((state) => state.opusClaimAssessment?.claimProcessData?.insured);

  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const params = {
    insured: { insuredId, policyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  const { clientInfoList = [] } = resultData || {};

  if (success && resultData) {
    const {
      policyAgentList = [],
      policyBeneficiaryList = [],
      clientInfoList = [],
    } = lodash.pick(response.resultData, [
      'policyAgentList',
      'policyBeneficiaryList',
      'clientInfoList',
    ]);

    yield put({
      type: 'saveClientInfoList',
      payload: {
        clientInfoList,
      },
    });

    yield put({
      type: 'saveC360PolicyInfo',
      payload: {
        c360PolicyInfo: resultData,
      },
    });

    if (policyAgentList?.length) {
      const policyAgent = lodash.find(policyAgentList, { policyId });

      if (policyAgent) {
        yield put({
          type: 'savePolicyAgent',
          payload: { policyAgent },
        });
      }
    }

    if (policyBeneficiaryList?.length) {
      yield put({
        type: 'savePolicyBeneficiaryList',
        payload: { policyBeneficiaryList, clientInfoList },
      });
    }
  }
}
