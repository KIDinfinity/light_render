import { useMemo, useCallback } from 'react';
import lodash from 'lodash';

export default ({ buttonList, taskDetail, businessData }: any) => {
  const handleHiddenCallback = useCallback(
    (hidden) => {
      return hidden({ taskDetail, businessData });
    },
    [taskDetail, businessData]
  );
  return useMemo(() => {
    return lodash.filter(buttonList, (item: any) => {
      if (lodash.isBoolean(item?.hidden)) {
        return !item?.hidden;
      }
      if (lodash.isFunction(item?.hidden)) {
        return !handleHiddenCallback(item?.hidden);
      }
      return true;
    });
  }, [buttonList, handleHiddenCallback]);
};
