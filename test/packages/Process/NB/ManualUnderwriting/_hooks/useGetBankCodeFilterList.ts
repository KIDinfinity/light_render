import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  const renewalPayType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList?.[0]?.renewalPayType,
    shallowEqual
  );
  const currencyCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList?.[0]?.currencyCode,
    shallowEqual
  );
  useEffect(() => {
    if (
      lodash.isEmpty(formUtils.queryValue(renewalPayType)) ||
      lodash.isEmpty(formUtils.queryValue(currencyCode))
    ) {
      dispatch({
        type: `${NAMESPACE}/setNewBankCodeList`,
        payload: {
          bankCodeFilterArray: [],
        },
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/getNewBankCodeList`,
      });
    }
  }, [renewalPayType, currencyCode]);
};
