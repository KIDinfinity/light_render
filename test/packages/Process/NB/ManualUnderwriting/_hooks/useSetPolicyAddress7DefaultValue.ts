import { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import useGetPolicyCountry from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyCountry';

export default () => {
  const dispatch = useDispatch();
  const currentCountry = useGetPolicyCountry();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const countryCode = lodash.get(businessData, 'policyList[0].policyAddressList.[0].countryCode');
  useEffect(() => {
    if (lodash.isEmpty(currentCountry)) {
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'setPlanFieldData',
        payload: {
          changedFields: { PolicyAddress7: countryCode },
        },
      });
    }
  }, []);
};
