import { useMemo } from 'react';
import lodash from 'lodash';
import { NbClientTag } from 'process/NB/CustomerIdentification/Enum';

export default ({ policy }: any) => {
  return useMemo(() => {
    const result = lodash
      .chain(policy.clientInfoList)
      .filter((item) => {
        let match = false;
        const matchItem = lodash.find(item.identificationList, (idItem) => {
          return idItem.clientTag === NbClientTag.FullyMatch;
        });
        if (matchItem) {
          match = true;
        }
        return match;
      })
      .map((item: any) => {
        const combinedResult = lodash
          .chain(item)
          .get('identificationList', [])
          .find((idItem: any) => {
            return idItem?.customerType === item?.customerType;
          })
          .get('combinedResult')
          .value();
        return {
          ...item,
          combinedResult,
        };
      })
      .value();
    return result;
  }, [policy]);
};
