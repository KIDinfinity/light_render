import lodash from 'lodash';
import { refreshBankInfo } from '@/services/owbNbProposalControllerService';
import { NAMESPACE } from '../../activity.config';
import TaskStatus from 'enum/TaskStatus';

export default function* (_, { call, put, select }: any) {
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );

  const { businessNo, processInstanceId, taskId, taskStatus } = lodash.pick(taskDetail, [
    'caseNo',
    'inquiryBusinessNo',
    'businessNo',
    'taskStatus',
    'processInstanceId',
    'taskId',
  ]);
  if (taskStatus !== TaskStatus.todo) {
    return false;
  }
  // return false;
  const response = yield call(refreshBankInfo, {
    applicationNo: businessNo,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const bankList = lodash.get(response, 'resultData.bankInfoList');

    yield put({
      type: 'saveRefreshBrankList',
      payload: {
        bankList,
      },
    });

    if (!lodash.isEmpty(bankList)) {
      yield put({
        type: 'saveSnapshot',
        payload: {
          processInstanceId,
          taskId,
          isSelectPostData: true,
        },
      });
    }
  }
  return response;
}
