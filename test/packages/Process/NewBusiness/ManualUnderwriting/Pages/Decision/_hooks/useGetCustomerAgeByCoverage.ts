import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetClientInfoList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ coverageItem }: any) => {
  const clientId = useMemo(() => {
    return formUtils.queryValue(
      lodash.chain(coverageItem).get('coverageInsuredList[0].clientId').value()
    );
  }, [coverageItem]);
  const clientInfoList = useGetClientInfoList();
  return useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(clientInfoList)
        .find((item: any) => {
          return item?.id === clientId;
        })
        .get('customerAge')
        .value()
    );
  }, [clientInfoList, clientId]);
};
