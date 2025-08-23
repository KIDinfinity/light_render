import { useCallback } from 'react';
import lodash from 'lodash';
import { NbClientTag } from 'process/NB/CustomerIdentification/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  return useCallback(({ item }: any) => {
    if (
      lodash
        .chain(item)
        .get('identificationList', [])
        .some((idItem: any) => idItem.clientTag === NbClientTag.FullyMatch)
        .value()
    ) {
      return formatMessageApi({
        Dropdown_NB_ClientTag: NbClientTag.FullyMatch,
      });
    }

    if (
      lodash
        .chain(item)
        .get('identificationList', [])
        .some((idItem: any) => idItem.clientTag === NbClientTag.Mismatch)
        .value()
    ) {
      return formatMessageApi({
        Dropdown_NB_ClientTag: NbClientTag.Mismatch,
      });
    }
  }, []);
};
