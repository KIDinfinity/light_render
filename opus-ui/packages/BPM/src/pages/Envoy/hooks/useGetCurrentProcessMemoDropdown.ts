import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const currentProcessMemoDropdown = useSelector(
    (state: any) => state.envoyController?.currentProcessMemoDropdown,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.map(currentProcessMemoDropdown, (item: any) => {
      const memoCode = item?.memoCode;

      return {
        memoCode,
        memoName: `${memoCode}-${formatMessageApi({
          DropDown_ENV_PendingMemoDescription: memoCode,
        })}`,
        reasonCode: item?.reasonCode,
        reasonGroupCode: item?.reasonGroupCode,
      };
    });
  }, [currentProcessMemoDropdown]);
};
