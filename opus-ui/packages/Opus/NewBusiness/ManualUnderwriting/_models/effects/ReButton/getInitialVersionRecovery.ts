import lodash from 'lodash';
import { initialVersionRecovery } from '@/services/owbNbProposalControllerService';
import bpm from 'bpm/pages/OWBEntrance';

export default function* (_: any, { call, select, put }: any): Generator<any, any, any> {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};

  const response = yield call(initialVersionRecovery, {
    ...lodash.pick(taskDetail, ['activityKey', 'businessNo', 'caseCategory', 'caseNo', 'taskId']),
  });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    !lodash.isEmpty(response?.resultData?.businessData)
  ) {
    const businessData = response?.resultData?.businessData;
    yield put.resolve({
      type: 'getBEToFE',
      payload: {
        businessData,
      },
    });

    bpm.buttonAction('save');
  }
}
