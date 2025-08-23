import lodash from 'lodash';
import { submit } from '@/services/navigatorBusinessOperationControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select, call, put }: any) {
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const data = {
    ...dataForSubmit,
    taskId: taskDetail?.taskId,
    caseCategory: taskDetail?.caseCategory,
    activityKey: taskDetail?.taskDefKey,
    businessNo: taskDetail?.businessNo,
    operationType: 'confirm',
    caseNo: taskDetail?.processInstanceId,
    businessData: {
      ...dataForSubmit?.businessData,
    },
  };
  const response = yield call(submit, data);
  return lodash.merge(response, { taskId: taskDetail?.taskId });
}
