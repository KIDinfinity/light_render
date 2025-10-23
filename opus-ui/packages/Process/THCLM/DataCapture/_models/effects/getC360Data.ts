import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
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

  const isInitial = payload?.isInitial;
  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));

  const params = {
    insured: lodash.pick(insuredObj, [
      'insuredId',
      'identityNo',
      'identityType',
      'firstName',
      'middleName',
      'surname',
      'gender',
      'dateOfBirth',
      'postCode',
      'clientId',
      'policyId',
      'relativeClientIdList',
    ]),
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const newAgentNoList = getAgentNoList(resultData?.policyAgentList);
    const newPolicyAgent = getAgentInfo(insuredObj?.policyId, resultData?.policyAgentList);
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
  }
}
