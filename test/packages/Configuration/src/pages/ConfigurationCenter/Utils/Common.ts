import { notification } from 'antd';
import lodash from 'lodash';

class Common {
  // 排序
  sortSeq = (type: string) => (eleA: any, eleB: any) => {
    if (eleA[type] === eleB[type]) return 0;
    if (eleA[type] === null || eleA[type] === undefined) return 1;
    if (eleB[type] === null || eleB[type] === undefined) return -1;
    return Number(eleA[type]) < Number(eleB[type]) ? -1 : 1;
  };

  showErrors = (promptMessages: Record<string, any>[] = [], params: any = {}) => {
    promptMessages &&
      lodash.isArray(promptMessages) &&
      lodash.map(promptMessages, (el: any) => {
        notification.error({
          message: '请求失败',
          description: el.content,
          placement: 'topRight',
          ...params,
        });
        return el;
      });
  };

  showSuccess = (message: string, params: any = {}) => {
    notification.success({
      message,
      ...params,
    });
  };
}

export const { sortSeq, showSuccess, showErrors } = new Common();
