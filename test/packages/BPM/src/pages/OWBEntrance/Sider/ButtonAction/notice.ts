import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification } from 'antd';

export default async ({ buttonCode, message }: any) => {
  let notice = formatMessageApi({
    Label_COM_WarningMessage: `venus_bpm.message.${buttonCode}.success`,
  });
  if (lodash.isFunction(message?.success)) {
    notice = await message?.success();
  }
  notification.success({
    message: notice,
  });
};
