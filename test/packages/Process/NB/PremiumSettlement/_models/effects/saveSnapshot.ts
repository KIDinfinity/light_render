import lodash from 'lodash';
import navigatorTaskInfoControllerService from '@/services/navigatorTaskInfoControllerService';

export default function* saveShapshot({ payload }: any, { call }: any) {
  const { postData, processInstanceId, taskId } = payload;

  if (lodash.isEmpty(postData) || !lodash.isPlainObject(postData)) return false;

  if (lodash.get(postData, 'policyList[0].manualExtendNtu') === 1) {
    lodash.set(postData, 'policyList[0].manualExtendNtu', true);
  }

  const saveData = {
    processInstanceId,
    taskId,
    snapshotDataList: [
      {
        taskId,
        dataType: 'mainPage',
        dataValue: JSON.stringify(postData),
      },
    ],
  };
  const response = yield call(navigatorTaskInfoControllerService.snapshot, saveData);

  return response;
}
