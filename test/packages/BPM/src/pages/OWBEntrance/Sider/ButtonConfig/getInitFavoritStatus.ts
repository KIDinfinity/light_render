import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import bpmFavouriteTaskService from '@/services/bpmFavouriteTaskService';

/**
 * 获取favorite 的初始状态
 * @param {String} object.userId
 * @param {String} object.taskId
 * @return {Number} 1/0
 */
export default async ({ userId, taskId }: any) => {
  let favoriteStatus = 0;
  const response = await bpmFavouriteTaskService.getFavoriteTask(
    objectToFormData({ userId, taskId })
  );
  if (lodash.get(response, 'success')) {
    favoriteStatus = lodash.get(response, 'resultData', 0);
  }
  return favoriteStatus;
};
