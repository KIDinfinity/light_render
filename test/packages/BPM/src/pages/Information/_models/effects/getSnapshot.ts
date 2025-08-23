import { queryData } from '@/services/dcSnapshotService';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import Snapshot from 'basic/utils/snapshot';

const snapshot = new Snapshot();

export default function* getSnapshot({ payload }: any, { call, put }: any) {
  const { taskId } = payload;
  const response = yield call(queryData, { taskId, dataType: 'information' });
  const result = safeParseUtil(lodash.get(response, 'resultData.dataValue')) || [];
  if (
    snapshot.validateInformationSnapshot({
      data: result,
    })
  ) {
    yield put({
      type: 'setAddInformations',
      payload: {
        record: result,
      },
    });

    // Save the data for autoTriggerSiderBar
    // yield put({
    //   type: 'workspaceSwitchOn/saveTriggerModalData',
    //   payload: {
    //     processInstanceId: taskId,
    //     triggerModalData: {
    //       [taskId]: {
    //         [api.queryData]: response,
    //       },
    //     },
    //   },
    // });
    return result;
  }
  return [];
}
