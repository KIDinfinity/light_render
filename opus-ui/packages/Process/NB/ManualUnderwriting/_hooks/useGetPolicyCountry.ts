import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetPolicyAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyAddressInfoList';
export default () => {
  const addressInfoList = useGetPolicyAddressInfoList();
  const result = useMemo(() => {
    return formUtils.queryValue(lodash.chain(addressInfoList).get('countryCode').value());
  }, [addressInfoList]);
  return result;
};
