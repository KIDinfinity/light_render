import { getDbNameList } from '@/services/ccInspectionControllerService';
import { notification } from 'antd';

export default function* (_: any, { put, call }: any): any {
  const response: any = yield call(getDbNameList);

  if (response && response.success) {
    yield put({
      type: 'setCheckDbNameList',
      payload: {
        list: response.resultData || [],
      },
    });
  } else {
    notification.error({ message: response?.promptMessages?.[0]?.content || 'error!' });
  }
}
