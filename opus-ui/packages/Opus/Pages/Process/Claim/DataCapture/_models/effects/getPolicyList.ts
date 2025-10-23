import lodash from 'lodash';
import { inquiryByInsured } from '@/services/claimC360PolicyControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select, call, put }: any) {
  // @ts-ignore
  const insuredInfo = yield select(
    (state: any) => state.opusClaimDataCapture.claimProcessData.insured
  ) || {};

  if (!lodash.isEmpty(insuredInfo)) {
    const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
    const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
    const params = {
      insured: { insuredId, policyId },
      regionCode: tenant.remoteRegion(),
    };
    // @ts-ignore
    const response = yield call(inquiryByInsured, params);

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isPlainObject(response?.resultData)
    ) {
      yield put({
        type: 'saveC360PolicyInfo',
        payload: {
          c360PolicyInfo: response?.resultData,
        },
      });

      if (lodash.isArray(response.resultData.policyContractList)) {
        const contractList = response.resultData.policyContractList || [];

        yield put({
          type: 'policyListUpdate',
          payload: { policyContractList: contractList },
        });

        yield put({
          type: 'savePayeeDefaultBankInfo',
          payload: { policyContractList: contractList },
        });
      }

      const {
        policyAgentList = [],
        clientInfoList = [],
        policyOwnerList = [],
      } = lodash.pick(response.resultData, [
        'policyAgentList',
        'clientInfoList',
        'policyOwnerList',
      ]);

      if (policyAgentList?.length) {
        const policyAgent = lodash.find(policyAgentList, { policyId });

        if (policyAgent) {
          yield put({
            type: 'savePolicyAgent',
            payload: { policyAgent },
          });
        }
      }

      if (policyOwnerList?.length) {
        yield put({
          type: 'savePolicyOwnerList',
          payload: { policyOwnerList, clientInfoList },
        });
      }
    }
  }
}
