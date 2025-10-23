import { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const { renewalPayType = '', currencyCode = '' } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
    ) || {};

  useEffect(() => {
    if (renewalPayType && currencyCode) {
      dispatch({
        type: `${NAMESPACE}/getBankCodesByRenewalPayTypeAndCurrencyCode`,
        payload: {
          renewalPayType,
          currencyCode,
        },
      });
    }
  }, [renewalPayType, currencyCode]);
};
