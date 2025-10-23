import lodash from 'lodash';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import getPremBankAccount from '../functions/getPremBankAccount';
import { getAgentInfo, getAgentNoList } from '../functions/getServiceAgentInfo';

export default function* getC360Data({ payload }: any, { call, put, select }: any) {
  const { insuredInfo, policyAgent, caseCategory } = yield select((state: any) => ({
    insuredInfo: state.opusNonOpusClaimManagement.businessData.insured,
    policyAgent: state.opusNonOpusClaimManagement.businessData.policyAgent,
    caseCategory: state.processTask.getTask?.caseCategory,
  }));
  const isInitial = payload?.isInitial;
  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const params = {
    insured: { insuredId, policyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    const newAgentNoList = getAgentNoList(resultData?.policyAgentList);
    const newPolicyAgent = getAgentInfo(policyId, resultData?.policyAgentList);
    const newAgentNumber = lodash.get(newPolicyAgent, 'agentNumber');
    const policyBeneficiaryList = lodash.get(response.resultData, 'policyBeneficiaryList', []);
    const clientInfoList = lodash.get(response.resultData, 'clientInfoList', []);
    yield put({
      type: 'savePolicyBeneficiaryList',
      payload: { policyBeneficiaryList, clientInfoList },
    });

    yield put({
      type: 'updateNonOpusInfo',
      payload: {
        c360PolicyInfo: resultData,
        caseCategory,
        claimNo: resultData?.businessNo,
        inquiryClaimNo: resultData?.businessNo,
        insured: insuredObj,
        regionCode: tenant.remoteRegion(),
      },
    });
    yield put({
      type: 'saveC360PolicyInfo',
      payload: {
        c360PolicyInfo: resultData,
        caseCategory,
        claimNo: resultData?.businessNo,
        inquiryClaimNo: resultData?.businessNo,
        insured: insuredObj,
        regionCode: tenant.remoteRegion(),
      },
    });

    yield put({
      type: 'saveC360PolicyInfo',
      payload: {
        c360PolicyInfo: response?.resultData,
      },
    });

    yield put({
      type: 'updateCustomerRole',
      payload: {
        clientInfoList: resultData?.clientInfoList,
      },
    });

    yield put({
      type: 'savePremBankAccount',
      payload: {
        premBankAccount: getPremBankAccount(
          resultData?.clientBankAccountList,
          formUtils.queryValue(policyId)
        ),
      },
    });

    newAgentNoList.push(newAgentNumber);
    // 初始化的时候需要将当前agentNumber添加到agentNoList
    if (isInitial) {
      const curAgentNumber = formUtils.queryValue(policyAgent?.agentNumber);
      newAgentNoList.push(curAgentNumber);
    }

    yield put({
      type: 'policyListUpdate',
      payload: { policyContractList: response?.resultData?.policyContractList || [] },
    });

    const concatAgentNoList = lodash.chain(newAgentNoList).compact().uniq().value();
    const policySource =
      lodash.find(response?.resultData?.policyContractList, { policyId })?.sourceSystem || '';
    if (policySource) {
      yield put({
        type: 'saveSourceSystem',
        payload: {
          policySource,
        },
      });
    }
    if (!isInitial) {
      // 初始化不需要更新policyAgent Info 只有当选择insured的时候才会更新
      yield put({
        type: 'savePolicyAgent',
        payload: { policyAgent: newPolicyAgent },
      });
    }
    yield put({
      type: 'savePartyListInfo',
      payload: {
        agentNoList: concatAgentNoList,
      },
    });
  }
}
