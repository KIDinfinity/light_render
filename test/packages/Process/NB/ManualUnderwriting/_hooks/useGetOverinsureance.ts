import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetClientDetailById from './useGetClientDetailById';

export default (id) => {
  const client = useGetClientDetailById({ clientId: id });

  return useMemo(() => {
    return formUtils.queryValue(lodash.get(client, 'otherContract')) === 'Y';
  }, [client]);
};
