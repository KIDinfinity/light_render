import { exec } from '@/services/ccSqlExecutorControllerService';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';

export default function* ({ payload }: any, { call }: any): any {
  const { fileName } = payload;
  const response: any = yield call(exec, null, {
    query: {
      fileName,
    },
  });
  if (response && response?.success) {
    notification.success({
      message: 'Execute SQL successfully!',
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response && response?.success;
}
