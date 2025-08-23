import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import bpmManualWorkflowControllerService from '@/services/bpmManualWorkflowControllerService';
interface IAction {
  payload: {
    caseNo: string;
  };
}

export default function* changeCaseNo({ payload }: IAction, { call, put }: any) {
  const caseNo: string = lodash.get(payload, 'caseNo', '');

  yield put({
    type: 'saveCaseNo',
    payload: {
      caseNo,
    },
  });

  const res: any = yield call(
    bpmManualWorkflowControllerService.getManuallyWorkflow,
    objectToFormData({
      caseNo,
    })
  );

  if (lodash.isPlainObject(res) && res.success && lodash.isPlainObject(res.resultData)) {
    yield put({
      type: 'saveSourceData',
      payload: {
        ...lodash.pick(res.resultData, [
          'caseNo',
          'autoActivity',
          'businessNo',
          'caseCategory',
          'currentActivityKey',
          'targetActivities',
          'taskId',
        ]),
      },
    });
  } else {
    yield put({
      type: 'saveSourceData',
      payload: {
        caseNo,
        autoActivity: '',
        businessNo: '',
        caseCategory: '',
        currentActivityKey: '',
        targetActivities: [],
        taskId: '',
      },
    });
  }
}
