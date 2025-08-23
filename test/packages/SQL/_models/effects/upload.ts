import { upload } from '@/services/ccSqlExecutorControllerService';
import { notification } from 'antd';
import { serialize as objectToFormData } from 'object-to-formdata';
import handleMessageModal from '@/utils/commonMessage';

export default function* ({ payload }: any, { call }: any): any {
  const { file } = payload;
  yield new Promise((resolve) => setTimeout(resolve, 4000))
  const response: any = yield call(
    upload,
    objectToFormData({
      file,
    })
  );
  if (response && response.success) {
    notification.success({
      message: 'Import SQL successfully!',
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response && response.success
}
