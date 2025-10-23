import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ annualIncomeCurrency, id }: any) => {
  const dispatch = useDispatch();
  const currencyCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode
  );
  useEffect(() => {
    const fetchData = async () => {
      if (lodash.isEmpty(currencyCode)) {
        await dispatch({
          type: `${NAMESPACE}/queryRegionDefaultCurrency`,
        });
      }
      await dispatch({
        type: `${NAMESPACE}/getExchangeRate`,
        payload: {
          fromCurrency: annualIncomeCurrency,
          currencyCode,
        },
      });
    };
    fetchData();
  }, [id, annualIncomeCurrency]);
};
