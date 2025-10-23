import lodash from 'lodash';
import navigatorTaskInfoControllerService from '@/services/navigatorTaskInfoControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* saveShapshot({ payload }: any, { call, select }: any) {
  const { postData, processInstanceId, taskId, isSelectPostData } = payload;

  if (!isSelectPostData && (lodash.isEmpty(postData) || !lodash.isPlainObject(postData)))
    return false;

  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const _data = isSelectPostData ? businessData : postData;

  console.log('🚀 ~ _data:', lodash.cloneDeep(_data));

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
        dataValue: JSON.stringify(_data),
      },
    ],
  };
  const response = yield call(navigatorTaskInfoControllerService.snapshot, saveData);

  return response;
}
