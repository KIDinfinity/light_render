import lodash, { isArray } from 'lodash';
import { getAgentBankList } from '@/services/owbNbProposalAgentControllerService';
import {
  taskIdentifierSelector,
  distributionChannelDataSelector,
} from 'process/NewBusiness/ManualUnderwriting/Pages/DistributionChannel/selectors';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default function* ({ payload }: any, { call, put, select }: any) {
  const agentList = lodash.get(payload, 'agentList');

  const { businessNo } = yield select(taskIdentifierSelector);
  const { bankStaffList: oldBankStaffList } = yield select(distributionChannelDataSelector);
  const oldAgentNos = Object.keys(oldBankStaffList || {});
  if (isArray(agentList) && agentList.length > 0) {
    const requestData = lodash
      .map(agentList, (item) => {
        const { agentNo, agentType } = lodash.pick(item, ['agentNo', 'agentType']);
        const params = {
          agentType: formUtils.queryValue(agentType),
          agentNo: formUtils.queryValue(agentNo),
          applicationNo: businessNo,
        };
        return formUtils.objectQueryValue(params);
      })
      .filter(
        (item: any) =>
          !!item?.agentNo &&
          (!lodash.includes(oldAgentNos, item?.agentNo) || tenant?.region() === Region.ID)
      );
    if (requestData.length <= 0) {
      return;
    }
    // @ts-ignore
    const result = yield call(getAgentBankList, requestData);

    if (result.success && result.resultData) {
      const bankStaffList = result.resultData.reduce((pre: any, nxt: any) => {
        const bankList =
          nxt.uwProposalAgent.bankList?.map((bank: any) => ({
            bankStaffNo: bank.bankStaffNo,
            bankStaffRefName: bank.bankStaffRefName,
            servicingBranch: bank.servicingBranch,
          })) || [];
        const agentNo = nxt?.uwProposalAgent?.agentNo;
        if (agentNo) {
          return {
            ...pre,
            [agentNo]: {
              agentNo,
              bankList,
            },
          };
        }
        return pre;
      }, {});
      const servicingBranchList = result.resultData.reduce((pre: any, nxt: any) => {
        const branchList = nxt.uwProposalAgent?.bancaBranch;
        const agentNo = nxt?.uwProposalAgent?.agentNo;
        if (agentNo) {
          return {
            ...pre,
            [agentNo]: branchList,
          };
        }
        return pre;
      }, {});
      yield put({
        type: `patchBankStaffList`,
        payload: {
          bankStaffList,
          servicingBranchList,
        },
      });
    }
  }
}
