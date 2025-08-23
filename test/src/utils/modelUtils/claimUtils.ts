import lodash from 'lodash';
import { eOperationType } from '@/enum/eOperationType';

const getSubmitData = ({
  taskDetail,
  dataForSubmit,
  variables,
  operationType = eOperationType.submit,
  extra = {},
}: any) => {
  const {
    taskDefKey,
    processInstanceId,
    taskId,
    caseCategory,
    businessNo,
    assignee,
    editFlag,
    inquiryBusinessNo,
    companyCode,
  } = lodash.pick(taskDetail, [
    'taskId',
    'processInstanceId',
    'taskDefKey',
    'caseCategory',
    'businessNo',
    'assignee',
    'editFlag',
    'inquiryBusinessNo',
    'companyCode',
  ]);

  return {
    caseNo: processInstanceId,
    caseCategory,
    businessNo,
    taskId,
    assignee,
    companyCode,
    activityKey: taskDefKey,
    businessData: {
      ...dataForSubmit,
      variables,
      caseCategory,
      taskId,
      processInstanceId,
      activityKey: taskDefKey,
    },
    activityVariables: {
      ...variables,
      editFlag: editFlag === '02' ? '00' : editFlag,
    },
    operationType,
    inquiryBusinessNo,
    ...extra,
  };
};

export { getSubmitData };
