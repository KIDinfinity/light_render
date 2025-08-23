import { useMemo } from 'react';
import lodash from 'lodash';
import useRequiredByNationality from './useRequiredByNationality';
import useGetClientDetailList from './useGetClientDetailList';

const hideField = ['SecondaryIdentityExpiryDate', 'SecondaryIdentityType', 'SecondaryIdentityNo'];

export default ({ id, config }: any) => {
  const clientDetailList = useGetClientDetailList();
  const current = lodash.find(clientDetailList, (i: any) => i.id === id);
  const isVisible = useRequiredByNationality({
    nationality: lodash.get(current, 'nationality'),
  });
  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item: any) => {
        if (lodash.includes(hideField, item?.field)) {
          return isVisible;
        }
        return true;
      })
      .value();
  }, [config, isVisible]);
};
