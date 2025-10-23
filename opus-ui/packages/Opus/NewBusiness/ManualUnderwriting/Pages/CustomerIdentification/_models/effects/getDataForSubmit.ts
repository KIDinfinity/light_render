import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { select }: any) {
  const { operationType } = payload;
  let claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  claimProcessData = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const {
    taskId,
    processInstanceId,
    caseCategory,
    submissionDate,
    businessNo,
    inquiryBusinessNo,
    taskDefKey,
    assessmentType,
  } = taskDetail;

  const dataForSubmit = {
    caseNo: processInstanceId,
    taskId,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
    submissionDate,
    activityKey: taskDefKey,
    operationType,
    assessmentType,
    businessData: claimProcessData,
  };

  return dataForSubmit;
}
