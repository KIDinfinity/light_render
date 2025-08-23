import { getBackupDataCompareResult } from '@/services/ccInspectionControllerService';
import { notification } from 'antd';

export default function* (_: any, { put, select, call }: any): any {
  const selectedRow = yield select((state: any) => state.sqlController?.checkSelectedRow);
  const onlineCheckList = yield select((state: any) => state.sqlController?.onlineCheckList);
  const selectList = onlineCheckList.filter((item) => selectedRow.includes(item?.id));

  const response: any = yield call(getBackupDataCompareResult, selectList || []);

  if (response && response.success) {
    yield put({
      type: 'setCheckCompareConfig',
      payload: {
        list: response.resultData,
      },
    });
  } else {
    notification.error({ message: response?.promptMessages?.[0]?.content || 'error!' });
  }
}
