/* eslint-disable func-names */
import { down } from '@/services/ccFileExecutorControllerService';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';


export default function* ({ payload }: any, { call }: any): any {
  const { id } = payload;
  const response: any = yield call(
    down,
    { id }
  );
  if (response && response.success) {
    notification.success({
      message: 'DownLoad successfully!',
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response && response.success
}
