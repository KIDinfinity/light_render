import lodash from 'lodash';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getPremBankAccount } from '../functions';
import { getAgentInfo, getAgentNoList } from '../functions/getServiceAgentInfo';

export default function* getC360Data({ payload }: any, { call, put, select }: any) {
  const { insuredInfo, policyAgent, caseCategory, businessNo } = yield select((state: any) => ({
    insuredInfo: state.JPCLMOfDataCapture.claimProcessData.insured,
    policyAgent: state.JPCLMOfDataCapture.claimProcessData.policyAgent,
    businessNo: state?.JPCLMOfDataCapture?.claimProcessData?.businessNo,
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
    const premiumPaymentMethod = lodash
      .chain(response)
      .get('resultData.policyContractList')
      .find((item: any) => item?.policyId === formUtils.queryValue(policyId))
      .get('premiumPaymentMethod')
      .value();

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
    // 初始化不需要更新policyAgent Info 只有当选择insured的时候才会更新
    if (!isInitial) {
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
    yield put({
      type: 'insured360/saveTaskInfo',
      payload: {
        taskDetail: {
          clientId: insuredId,
          insuredId,
          caseCategory,
          businessNo,
        },
      },
    });
    yield put({
      type: 'premiumPaymentMethodUpdate',
      payload: {
        premiumPaymentMethod,
      },
    });
  }
}
