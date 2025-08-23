import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  useEffect(() => {
    if (
      !lodash.isEmpty(businessData) &&
      lodash.chain(businessData).get('policyList[0].coverageList', []).isEmpty().value()
    ) {
      dispatch({
        type: `${NAMESPACE}/addRider`,
        payload: {},
      });
    }
  }, [businessData, dispatch]);
};
