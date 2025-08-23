import lodash from 'lodash';
import { submit } from '@/services/navigatorCaseOperationControllerService';
import { snapshot } from '@/services/navigatorTaskInfoControllerService';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';

export default function* (_: any, { call, put, select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData
  );
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail
  );
  const {
    taskId,
    caseNo,
    activityKey,
    caseCategory,
    businessNo,
    assignee,
  } = lodash.pick(taskDetail, [
    'taskId',
    'caseNo',
    'activityKey',
    'caseCategory',
    'businessNo',
    'assignee',
  ]);
  const newBusinessData = (() => {
    const appointmentDateList = lodash
      .chain(businessData)
      .get('appointmentDateList')
      .map((item: any) => {
        if (item?.status !== 'reject') {
          return {
            ...item,
            status: 'approval',
          };
        } else {
          return item;
        }
      })
      .value();
    return {
      ...businessData,
      appointmentDateList,
    };
  })();
  const data = {
    operationType: 'submit',
    taskId,
    caseNo,
    activityKey,
    caseCategory,
    businessData: newBusinessData,
    businessNo,
    assignee,
  };
  const dataForSave = assembleDefaultDataForSave({
    taskDetail,
    optionType: 'Save',
    dataForSubmit: data,
  });
  yield call(snapshot, dataForSave);
  const response = yield call(submit, data);
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'saveData',
      payload: {
        buttonValidate: false,
      },
    });
    yield put({
      type: `processTask/toogleMedicalRequestModal`,
      payload: {
        medicalRequestModalDisplay: false,
      },
    });
  }
}
