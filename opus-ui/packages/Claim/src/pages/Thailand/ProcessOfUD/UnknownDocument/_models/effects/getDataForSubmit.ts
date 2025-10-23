import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }) {
  const { claimProcessData, claimHistorySearchResultRowKeys, taskDetail } = yield select(
    (state) => ({
      ...lodash.pick(state.UnknownDocumentController, [
        'claimProcessData',
        'claimEntities',
        'claimHistorySearchResultRowKeys',
      ]),
      taskDetail: state.processTask.getTask,
    })
  );
  const { taskId, processInstanceId, caseCategory } = lodash.pick(taskDetail, [
    'taskId',
    'processInstanceId',
    'caseCategory',
  ]);
  const cliamDatas: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(claimProcessData)
  );
  const dataForSubmit = {
    submissionId: cliamDatas.submissionId,
    activityType: cliamDatas.activityType,
    decision: cliamDatas.decision,
    caseId: processInstanceId,
    resumeCaseIdList: claimHistorySearchResultRowKeys,
    taskParam: {
      caseCategory,
      taskId,
    },
  };
  return {
    1: dataForSubmit,
  };
}
