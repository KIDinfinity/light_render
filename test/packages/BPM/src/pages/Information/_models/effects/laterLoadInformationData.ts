import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

export default function* laterLoadInformationData({ payload }: any = {}, { select, put }: IEffects) {
  const { taskId, informationData } = yield select(
    (state: any) => state.navigatorInformationController
  );
  const processInstanceId = formUtils.queryValue(informationData?.caseNo) || payload?.processInstanceId;
  const taskDetail = payload?.taskDetail;
  if (taskId) {
    yield put({
      type: 'loadInformationInitData',
      payload: { processInstanceId, taskId, dataKey: 'taskId', taskDetail },
    });
  } else if (processInstanceId) {
    yield put({
      type: 'loadInformationInitData',
      payload: { processInstanceId, dataKey: 'caseNo', taskDetail },
    });
  }
}
