import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { select }: any) {
  const showOnly = payload?.showOnly;
  const {
    assignee,
    businessNo: applicationNo,
    caseNo,
    taskId,
    inquiryBusinessNo,
    taskDefKey: activityKey,
  } = yield select(({ processTask }: any) => processTask.getTask) || {};

  const { payType = '', paymentOption = '' } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
  ) || {};
  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.chequeInfoList
  ) || [];

  const chequeInfoListForEdit = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.processData?.chequeInfoList
  );

  const chequeNo = (() => {
    return formUtils.queryValue(
      lodash
        .chain(showOnly ? chequeInfoList : chequeInfoListForEdit)
        .first()
        .get('chequeNo')
        .value()
    );
  })();

  return {
    assignee,
    applicationNo,
    caseNo,
    taskId,
    chequeNo,
    paymentOption,
    payType,
    inquiryBusinessNo,
    activityKey,
  };
}
