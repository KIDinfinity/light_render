import lodash from 'lodash';
import type { Dispatch } from 'redux';
import type { LifeConfig } from '../../constants';
import { SS, SSKey } from '@/utils/cache';

interface IParams {
  action: Function | LifeConfig;
  dispatch: Dispatch;
  taskDetail: Object;
  claimStates: Object;
  buttonConfig?: Object;
  allveriables: Object;
  method: any;
}

export default async ({
  action,
  dispatch,
  taskDetail,
  claimStates,
  buttonConfig,
  allveriables,
  method,
}: IParams) => {
  if (lodash.isFunction(action)) {
    const taskSkipVaildate = SS.getItem(SSKey.TASKSKIPVAILDATE);
    if (!!taskSkipVaildate) {
      return null;
    }
    const result = await action({
      dispatch,
      taskDetail,
      claimStates,
      buttonConfig,
      allveriables,
      method,
    });
    return result;
  }

  if (lodash.isPlainObject(action)) {
    const { before, progress, after } = action as LifeConfig;

    if (lodash.isFunction(before)) {
      await before({ dispatch });
    }

    let result = null;
    if (lodash.isFunction(progress)) {
      result = await progress({
        dispatch,
        taskDetail,
        claimStates,
        buttonConfig,
        allveriables,
        method,
      });
    }

    if (lodash.isFunction(after)) {
      if (!(lodash.isArray(result) && result.length !== 0)) {
        await after({ dispatch });
      }
    }

    return result;
  }

  return null;
};
