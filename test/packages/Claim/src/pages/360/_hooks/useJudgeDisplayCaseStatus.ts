import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { BusinessCode } from 'claim/enum/BusinessCode';

export default () => {
  const businessCode = useSelector(
    ({ insured360 }: any) => insured360?.taskInfo?.businessCode,
    shallowEqual
  );

  return useMemo(() => {
    return ![BusinessCode.nb].includes(businessCode);
  }, [businessCode]);
};
