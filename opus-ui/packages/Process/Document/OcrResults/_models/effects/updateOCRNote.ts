import lodash from 'lodash';
import handleMessageModal from '@/utils/commonMessage';
import { notification } from 'antd';

export default function* updateNote({ payload }: any, { put }: any) {
  const { data } = payload;

  if (
    !!data.success &&
    lodash.isPlainObject(data?.resultData) &&
    !lodash.isEmpty(data?.resultData)
  ) {
    const { message, taskId } = data?.resultData || {};

    notification.success({
      message,
      onClose: () => {
        if (window.location.href.indexOf(taskId) > 0) {
          window.location.reload();
        }
      },
    });
  }

  if (
    !data.success &&
    !lodash.isEmpty(data.promptMessages) &&
    lodash.isArray(data.promptMessages)
  ) {
    handleMessageModal(data?.promptMessages);
  }
}
