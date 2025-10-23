import { exec } from '@/services/ccStatementExecutorControllerService';
import { notification } from 'antd';
import { lowerCase } from 'lodash';
import handleMessageModal from '@/utils/commonMessage';

// eslint-disable-next-line func-names
export default function* ({ payload }: any, { select, put, call }: any): any {
  const { datasource, limit, region } = payload;
  const sql = yield select((state: any) => state.sqlController?.sql)
  const response: any = yield call(
    exec,
    {
      datasource, limit, region: lowerCase(region), sql
    }
  );
  if (response && response?.success) {
    notification.success({
      message: 'Execute SQL successfully!',
    });

    yield put({
      type: 'saveExecList',
      payload: {
        execList: response?.resultData
      }
    })

  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response && response?.success
}
