import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetClientDetailList from './useGetClientDetailList';

export default ({ coverageId }: any) => {
  const list = useGetClientDetailList();
  const coverageList = useGetCoverageList('edit');
  return useMemo(() => {
    const roleSet = new Set();
    lodash
      .chain(coverageList)
      .find((coverage: any) => coverage.id === coverageId)
      .get('coverageInsuredList', [])
      .map((insured: any) => insured?.clientId)
      .forEach((clientId: string) => {
        lodash
          .chain(list)
          .find((client: any) => client?.id === formUtils.queryValue(clientId))
          .get('customerRole', [])
          .forEach((roleItem: any) => {
            roleSet.add(roleItem);
          })
          .value();
      })
      .value();

    return Array.from(roleSet);
  }, [coverageList, list, coverageId]);
};
