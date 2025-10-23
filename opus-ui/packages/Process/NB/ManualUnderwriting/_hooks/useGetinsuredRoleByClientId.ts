import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';

export default ({ clientId }: any) => {
  const coverageDataSoure = useGetCoverageDataSource();
  const mainCoverageClientIdList = lodash
    .chain(coverageDataSoure)
    .find((item) => item.isMain === 'Y')
    .get('coverageInsuredList')
    .map((coverageInsuredItem: any) => coverageInsuredItem.clientId)
    .value();

  return useMemo(() => {
    return lodash.isArray(clientId)
      ? lodash.reduce(
          clientId,
          (SI, el) => {
            return lodash.includes(mainCoverageClientIdList, el) ? 'PI' : SI;
          },
          'SI'
        )
      : lodash.includes(mainCoverageClientIdList, clientId)
      ? 'PI'
      : 'SI';
  }, [clientId, mainCoverageClientIdList]);
};
