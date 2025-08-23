import lodash from 'lodash';
import { notification } from 'antd';

export default (promptMessages: Record<string, any>[] = [], params: any = {}) => {
  promptMessages &&
    lodash.isArray(promptMessages) &&
    promptMessages.map((el: any) => {
      notification.error({
        message: el.content,
        description: '',
        placement: 'topRight',
        ...params,
      });
      return el;
    });
};
