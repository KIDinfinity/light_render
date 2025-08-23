import lodash from 'lodash';
import { useCallback } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { listRequestClientInfo } from '@/services/envoyMemoControllerService';

export default () => {
  const businessNo =
    useSelector(({ envoyController }: any) => envoyController?.businessNo, shallowEqual) || '';
  return useCallback(
    async ({ requestedClientRole }: any) => {
      if (!businessNo || !requestedClientRole) {
        return [];
      }
      const response = await listRequestClientInfo({
        businessNo,
        requestedClientRole,
      });

      const list = lodash.get(response, 'resultData', []) || [];

      return list;
    },
    [businessNo]
  );
};
