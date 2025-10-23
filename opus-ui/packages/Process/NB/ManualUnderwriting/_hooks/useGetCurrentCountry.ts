import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ addrType, addressInfoList }: any) => {
  const result = useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(addressInfoList)
        .find((item: any) => formUtils.queryValue(item?.addrType) === addrType)
        .get('country')
        .value()
    );
  }, [addrType, addressInfoList]);
  return result;
};
