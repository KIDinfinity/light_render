import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/activity.config';

type IResponse = Record<string, any>;

export default function* getDataForSubmit(action, { select }: any) {
  const taskDetail: IResponse = yield select(({ processTask }: any) => processTask.getTask);
  const taskNotEditable: IResponse = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const processData: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );

  const { processInstanceId, taskId, taskDefKey, assessmentType, submissionDate, caseCategory } =
    lodash.pick(taskDetail, [
      'processInstanceId',
      'taskId',
      'taskDefKey',
      'assessmentType',
      'submissionDate',
      'caseCategory',
    ]);

  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(processData));

  return {
    ...claimData,
    taskId,
    taskNotEditable,
    activityKey: taskDefKey,
    processInstanceId,
    assessmentType,
    submissionDate,
    policyNo: claimData?.policyInfo?.policyNo,
    caseCategory,
  };
}
