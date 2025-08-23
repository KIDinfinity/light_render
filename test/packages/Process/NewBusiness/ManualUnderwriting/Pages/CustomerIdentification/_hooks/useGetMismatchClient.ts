import { useMemo } from 'react';
import lodash from 'lodash';
import { NbClientTag } from '../Enum';

export default ({ policy }: any) => {
  return useMemo(() => {
    const result = lodash
      .chain(policy.clientInfoList)
      .filter(
        (item) =>
          lodash.isArray(item.identificationList) &&
          lodash.some(
            item.identificationList,
            (subItem: any) => subItem.clientTag === NbClientTag.Mismatch
          )
      )
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
