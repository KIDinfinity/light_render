/* eslint-disable func-names */
import { exec } from '@/services/ccFileExecutorControllerService';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';

export default function* ({ payload }: any, { call }: any): any {
  const { id } = payload;
  const response: any = yield call(
    exec,
    null,
    {
      query: {
        id
      }
    }
  );
  if (response && response?.success) {
    notification.success({
      message: 'Execute SQL successfully!',
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response && response?.success
}
