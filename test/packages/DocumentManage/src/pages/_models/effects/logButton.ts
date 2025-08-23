import { ButtonCode } from 'bpm/enum';
import lodash from 'lodash';

export default function* logButton({ payload }: any, { select, put }: any) {
  const {
    taskId,
    caseNo,
    taskDefKey: activityKey,
  } = yield select(({ solutionRead }: any) => solutionRead?.taskDetail);
  const name = payload?.name;

  yield put({
    type: 'auditLogController/logButton',
    payload: {
      action: lodash.upperFirst(ButtonCode.Acknowledge),
      taskId,
      isAuto: false,
      processInstanceId: caseNo,
      activityKey,
      desc: name,
    },
  });
}
