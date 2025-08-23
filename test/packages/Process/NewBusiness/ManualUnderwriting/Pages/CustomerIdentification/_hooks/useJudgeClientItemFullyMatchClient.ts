import { useMemo } from 'react';
import lodash from 'lodash';
import { NbClientTag } from '../Enum';

export default ({ item }: any) => {
  return useMemo(() => {
    return lodash
      .chain(item)
      .get('identificationList', [])
      .some((idItem: any) => idItem.clientTag === NbClientTag.FullyMatch)
      .value();
  }, [item]);
};
