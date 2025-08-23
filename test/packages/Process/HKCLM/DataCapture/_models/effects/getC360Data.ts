import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { handleMessageModal } from '@/utils/commonMessage';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { updateCase } from '@/services/navigatorHnwCustomerRefreshControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getAgentInfo, getAgentNoList } from '../functions/getServiceAgentInfo';

export default function* getC360Data({ payload }: any, { call, put, select }: any) {
  const insuredInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.insured
  );
  const policyAgent = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.policyAgent
  );
  const { caseCategory, companyCode } = yield select(
    ({ processTask }: any) => processTask?.getTask
  ) || {};
  const isInitial = payload?.isInitial;
  const insuredInfoPayload = payload?.insuredInfo;
  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(insuredInfoPayload || insuredInfo)
  );
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const params = {
    insured: { insuredId, policyId },
    regionCode: tenant.remoteRegion(),
    ...(caseCategory === 'BP_CLM_CTG009' ? { companyCode: companyCode || 'Assurance' } : {}),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);

  const { success, resultData, type } = lodash.pick(response, ['success', 'resultData', 'type']);
  if (!success && type === ErrorTypeEnum.DataAuthorityException) {
    handleMessageModal([{ content: 'You are not allowed to process claim of HNW customer!' }]);
    return false;
  }
  if (success && resultData) {
    const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
    yield call(updateCase, {
      policyOwnerList: resultData?.policyOwnerList,
      policyInsuredList: resultData?.policyInsuredList,
      caseNo: taskDetail?.caseNo,
    });
    const c360PolicyInfo = resultData;
    const newAgentNoList = getAgentNoList(resultData?.policyAgentList);
    const newPolicyAgent = getAgentInfo(policyId, resultData?.policyAgentList);
    const newAgentNumber = lodash.get(newPolicyAgent, 'agentNumber');
    newAgentNoList.push(newAgentNumber);
    // 初始化的时候需要将当前agentNumber添加到agentNoList
    if (isInitial) {
      const curAgentNumber = formUtils.queryValue(policyAgent?.agentNumber);
      newAgentNoList.push(curAgentNumber);
    }
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
      type: 'saveC360PolicyInfo',
      payload: {
        c360PolicyInfo,
      },
    });
  }
  return resultData;
}
