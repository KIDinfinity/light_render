import { useCallback, useContext } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default () => {
  const { state } = useContext(context);
  return useCallback(
    async (buttonCode: string, params?: any) => {
      const button = lodash.find(
        state.finalButtonList,
        (item: any) => item.buttonCode === buttonCode
      );
      if (lodash.isFunction(button?.action)) {
        return await button.action({
          ...params,
          extraParams: params || {},
        });
      }
    },
    [state]
  );
};
