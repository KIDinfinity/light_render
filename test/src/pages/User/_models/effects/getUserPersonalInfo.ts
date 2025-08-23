import lodash from 'lodash';
import loginLogoutControllerService from '@/services/loginLogoutControllerService';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* getUserPersonalInfo({ payload }, { call }) {
  const response = yield call(loginLogoutControllerService.getUserPersonalInfo, {
    ...payload,
  });

  if (response?.success && lodash.isPlainObject(response?.resultData)) {
    return response?.resultData;
  }
  if (!response?.success && lodash.isPlainObject(response?.resultData)) {
    notification.error({
      message: formatMessageApi({ Label_COM_Message: response?.resultData?.content }) || 'fail!',
    });
  }

  return {};
}
