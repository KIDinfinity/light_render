import lodash from 'lodash';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

interface IAction {
  payload: {
    taskId: string;
  };
}

export default function* getTaskDetail({ payload }: IAction, { put }: any) {
  const { taskId } = payload;

  // @ts-ignore
  const response: any = yield getTask(
    objectToFormData({
      taskId,
    })
  );

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    yield put({
      type: 'saveTaskDetail',
      payload: {
        taskDetail: response?.resultData,
      },
    });
  }
}
