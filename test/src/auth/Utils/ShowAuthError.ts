import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { AuthProps } from '../Typings';

export default (authData: AuthProps, params: any = {}) => {
  // if(authData.result || !authData.errorCode){
  //   return
  // }
  notification.error({
    message: formatMessageApi({
      Label_COM_ErrorMessage: authData.errorCode,
    }),
    placement: 'topRight',
    ...params,
  });
};
