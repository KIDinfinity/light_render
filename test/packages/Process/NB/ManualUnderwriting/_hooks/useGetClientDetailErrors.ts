

import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';

export default (clientDetail: any) => {
  return useMemo(() => {
    const formErrors = formUtils.getErrorArray(clientDetail, true);
    return formErrors?.length ? formErrors : false;
  }, [clientDetail]);
};
