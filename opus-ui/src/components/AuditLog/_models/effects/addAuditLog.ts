import { addAuditLog } from '@/services/dcAuditService';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { Action } from '../../Enum';

export default function* ({ payload }: any, { call, select, put }: any) {
  const {
    inquiryBusinessNo: curInquiryBusinessNo,
    businessNo: curBusinessNo,
    action,
    processInstanceId: caseNo,
    activityKey,
    isSave,
    ...extraData
  } = payload;
  const {
    operaor,
    operatorId,
    processInstanceId,
    procActivityKey,
    taskId,
    inquiryBusinessNo,
    businessNo,
  } = yield select((state: any) => ({
    operaor: state?.user?.currentUser?.userName,
    operatorId: state?.user?.currentUser?.userId,
    processInstanceId: caseNo || state?.processTask?.getTask?.processInstanceId,
    taskId: extraData?.taskId || state?.processTask?.getTask?.taskId || '',
    procActivityKey: activityKey || state?.processTask?.getTask?.taskDefKey,
    inquiryBusinessNo:
      state?.processTask?.getTask?.inquiryBusinessNo ||
      extraData?.inquiryBusinessNo ||
      curInquiryBusinessNo,
    businessNo: state?.processTask?.getTask?.businessNo || extraData?.businessNo || curBusinessNo,
  }));
  const date =
    !isSave && action === Action.Save
      ? moment().subtract(1, 'seconds').format()
      : moment().format();
  const params = {
    id: uuidv4(),
    operaor,
    operatorId,
    date,
    action,
    ...extraData,
    taskId,
    processInstanceId,
    procActivityKey,
    platformCode: 'opus',
    sourceType: 'FE',
    inquiryBusinessNo,
    businessNo,
  };
  const response = yield call(addAuditLog, JSON.stringify(params));

  if (response?.success) {
    yield put({
      type: 'navigatorInformationController/saveAuditLogList',
      payload: {
        list: [params],
      },
    });
  }
}
