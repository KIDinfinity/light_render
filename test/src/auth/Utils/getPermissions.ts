import AuthCache from './AuthCache';
import CheckPermission from './CheckPermission';
import { Keys } from '../Constant';

export default (taskId: string, category: string | string[], isBoolean: boolean = false): any => {
  const taskKey = Keys.TASK(taskId);
  const cacheAuthList = AuthCache.getAuth(taskKey);
  return CheckPermission(category, cacheAuthList, isBoolean);
};
