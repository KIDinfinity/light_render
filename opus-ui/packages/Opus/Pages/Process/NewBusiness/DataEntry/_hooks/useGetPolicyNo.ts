import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const policyNoInfo = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.policyNoInfo,
    shallowEqual
  );
  return useMemo(() => {
    return policyNoInfo?.policyNo;
  }, [policyNoInfo]);
};
