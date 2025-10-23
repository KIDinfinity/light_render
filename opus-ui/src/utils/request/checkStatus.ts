import { notification } from 'antd';
import codeMessage from './codeMessage';

export default (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 504) {
    notification.error({
      message: response.statusText || codeMessage[response.status],
    });
  }

  const errortext = codeMessage[response.status] || response.statusText;
  const error: any = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};
