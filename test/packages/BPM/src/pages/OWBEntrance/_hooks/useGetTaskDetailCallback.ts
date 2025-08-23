import { useCallback } from 'react';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import lodash from 'lodash';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import { getNewNBUI } from 'process/Utils';

interface IParams {
  taskDetail: any;
  dataType?: string;
  skipSnapshot?: boolean;
  options?: any;
  taskId: string;
}

export default ({ taskId, taskDetail, dataType = 'mainPage', options = {} }: IParams) => {
  const id = taskId || lodash.get(taskDetail, 'taskId');
  const href = window.location.href.includes('process');
  return useCallback(
    async (skipSnapshot = false) => {
      window.history.replaceState(taskDetail, '');
      const response: any = await getTask(
        {
          taskId: id,
          dataType,
          skipSnapshot,
          needTransform: getNewNBUI(taskDetail),
        },
        options
      );

      const { success, type } = lodash.pick(response, ['success', 'type']);
      if (!success && type === ErrorTypeEnum.DataAuthorityException) {
        return { noPremission: true };
      }
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response.resultData)
      ) {
        return response.resultData;
      }

      return {};
    },
    [id, href]
  );
};
