import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ reasonGroup }: any) => {
  return useMemo(() => {
    return lodash
      .chain(reasonGroup)
      .get('reasonDetails', [])
      .every((reason: any) => !reason.reasonCode)
      .value();
  }, [reasonGroup]);
};
