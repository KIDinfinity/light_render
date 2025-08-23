import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* (action: any, { select, put }: any) {
  const checkDuplicating = action?.payload?.checkDuplicating;

  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  if (checkDuplicating) {
    lodash.set(
      dataForSubmit,
      'businessData.policyList.0.clientInfoList',
      lodash.filter(
        dataForSubmit?.businessData?.policyList?.[0]?.clientInfoList,
        (item) => item.id == checkDuplicating
      )
    );
  }
  const data = {
    ...dataForSubmit,
    taskId: taskDetail?.taskId,
    caseCategory: taskDetail?.caseCategory,
    activityKey: taskDetail?.taskDefKey,
    businessNo: taskDetail?.businessNo,
    operationType: checkDuplicating ? 'checkDuplicateConfirm' : 'confirm',
    caseNo: taskDetail?.processInstanceId,
    businessData: {
      ...dataForSubmit?.businessData,
    },
  };

  return data;
}
