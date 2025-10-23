import lodash from 'lodash';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { select }: any) {
  const { assignee, applicationNo, caseNo, taskId } = yield select(
    ({ processTask }: any) => processTask.getTask
  ) || {};

  const { payType = '', paymentOption = '' } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
  ) || {};
  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.chequeInfoList
  ) || [];

  const chequeNo = (() => {
    return lodash.chain(chequeInfoList).first().get('chequeNo').value();
  })();

  return {
    assignee,
    applicationNo,
    caseNo,
    taskId,
    chequeNo,
    paymentOption,
    payType,
  };
}
