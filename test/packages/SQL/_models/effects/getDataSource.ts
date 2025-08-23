import { datasource } from '@/services/ccStatementExecutorControllerService';
import handleMessageModal from '@/utils/commonMessage';

// eslint-disable-next-line func-names
export default function* (_: any, { call, put }: any): any {
  const response: any = yield call(datasource);
  if (!response || !response?.success) {
    handleMessageModal(response?.promptMessages);
    return;
  }

  yield put({
    type: 'saveDataSource',
    payload: {
      dataSource: response?.resultData?.map((el: string) => ({ dictName: el, dictCode: el }))
    }
  })

}
