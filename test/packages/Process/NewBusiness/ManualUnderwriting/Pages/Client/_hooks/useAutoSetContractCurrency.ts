import { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ id, contractCurrency }: any) => {
  const LocalCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode,
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!contractCurrency) {
      dispatch({
        type: `${NAMESPACE}/saveClientInfo`,
        payload: {
          changedFields: {
            annualIncomeCurrency: LocalCurrency,
          },
          id,
        },
      });
    }
  }, [id]);
};
