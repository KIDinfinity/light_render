import { useMemo } from 'react';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

export default () => {
  const inputLimitDate = tenant.getInputLimitDate();

  return useMemo(() => {
    return !lodash.isEmpty(inputLimitDate);
  }, [inputLimitDate]);
};
