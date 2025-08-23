import { useMemo } from 'react';
import lodash from 'lodash';
import { NbClientTag } from '../Enum';

export default ({ policy }: any) => {
  return useMemo(() => {
    const result = lodash
      .filter(policy.clientInfoList, (item) => {
        let match = false;
        const fullyMatchItem = lodash.find(item.identificationList, (idItem) => {
          return idItem.clientTag === NbClientTag.FullyMatch;
        });
        const suspectClientItem = lodash.find(item.identificationList, (idItem) => {
          return idItem.clientTag === NbClientTag.SuspectClient;
        });
        if (!fullyMatchItem && suspectClientItem) {
          match = true;
        }
        if (!item?.identificationList?.length) {
          match = true;
        }
        return match;
      })
      .map((item) => {
        return {
          ...item,
          age: item?.customerAge,
        };
      });
    return result;
  }, [policy]);
};
