import lodash from 'lodash';
import { getAgentBankList } from '@/services/owbNbProposalAgentControllerService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const requestData = lodash.get(payload, 'requestData');
  const bankStaffList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankStaffList
  );
  const result = yield call(getAgentBankList, requestData);

  if (result.success && result.resultData) {
    const newBankStaffList = (() => {
      const bankStaffListMap = new Map();
      lodash.forEach(bankStaffList, (item) => {
        bankStaffListMap.set(item?.uwProposalAgent?.agentNo, item);
      });
      lodash.forEach(result.resultData, (item) => {
        bankStaffListMap.set(item?.uwProposalAgent?.agentNo, item);
      });
      return lodash
        .chain(bankStaffListMap)
        .entries()
        .map(([key, value]) => value)
        .value();
    })();
    yield put({
      type: `${NAMESPACE}/saveBankStaffList`,
      payload: {
        bankStaffList: newBankStaffList,
      },
    });
  }
}
