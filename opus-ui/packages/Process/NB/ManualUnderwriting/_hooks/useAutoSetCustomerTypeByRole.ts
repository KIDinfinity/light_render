import { useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import CustomerType from 'process/NB/Enum/CustomerType';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }) => {
  const dispatch = useDispatch();
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    return lodash
      .chain(clientDetailList)
      .find((item: any) => item?.id === id)
      .get('roleList', [])
      .value();
  }, [clientDetailList, id]);
  return useEffect(() => {
    if (
      lodash.some(result, (item) => lodash.includes([CustomerRole.Beneficiary], item.customerRole))
    ) {
      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          changedFields: {
            customerType: CustomerType.Individual,
          },
          id,
        },
      });
    }
  }, [result]);
};
