import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ coverageId }: any) => {
  const list = useGetClientDetailList();
  const coverageList = useGetCoverageList();
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
          .find((client: any) => client.id === formUtils.queryValue(clientId))
          .get('roleList', [])
          .forEach((roleItem: any) => {
            roleSet.add(roleItem?.customerRole);
          })
          .value();
      })
      .value();
    return Array.from(roleSet);
  }, [coverageList, list, coverageId]);
};
