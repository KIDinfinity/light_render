import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0]')
      .pick(['payType', 'renewalPayType'])
      .value();
  }, [businessData]);
};
