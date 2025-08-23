import { useMemo, useCallback } from 'react';
import lodash from 'lodash';

export default ({ buttonList, taskDetail }: any) => {
  const handleDisabledButton = useCallback(
    (disabled) => {
      return disabled({ taskDetail });
    },
    [taskDetail]
  );
  return useMemo(() => {
    return lodash.map(buttonList, (item: any) => {
      if (lodash.isFunction(item?.disabled)) {
        return {
          ...item,
          disabled: handleDisabledButton(item?.disabled),
        };
      }

      return item;
    });
  }, [buttonList]);
};
