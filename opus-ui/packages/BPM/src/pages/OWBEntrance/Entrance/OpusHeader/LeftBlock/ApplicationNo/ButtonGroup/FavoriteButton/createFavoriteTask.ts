import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { createFavoriteTask } from '@/services/bpmFavouriteTaskService';

/**
 * 获取favorite 的初始状态
 * @param {String} object.userId
 * @param {String} object.taskId
 * @return {Number} 1/0
 */
export default async ({ userId, taskId }: any) => {
  const favoriteStatus = 0;
  const response = await createFavoriteTask(objectToFormData({ userId, taskId }));
  if (lodash.get(response, 'success')) {
  }
  return favoriteStatus;
};
