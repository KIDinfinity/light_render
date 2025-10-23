import lodash from 'lodash';
import { eOperationType } from '@/enum/eOperationType';

const getSubmitData = ({
  taskDetail,
  dataForSubmit,
  variables,
  operationType = eOperationType.submit,
}: any) => {
  const {
    taskDefKey,
    processInstanceId,
    taskId,
    caseCategory,
    businessNo,
    assignee,
  } = lodash.pick(taskDetail, [
    'taskId',
    'processInstanceId',
    'taskDefKey',
    'caseCategory',
    'businessNo',
    'assignee',
  ]);

  return {
    ...dataForSubmit,
    caseNo: processInstanceId,
    caseCategory,
    businessNo,
    taskId,
    assignee,
    activityKey: taskDefKey,
    activityVariables: variables,
    operationType,
  };
};

export { getSubmitData };
