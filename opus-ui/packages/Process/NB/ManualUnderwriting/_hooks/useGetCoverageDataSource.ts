import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetIncreasedCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetIncreasedCoverageList';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export default () => {
  const coverageList = useGetCoverageList();

  const checkingCoverageList = useGetIncreasedCoverageList();

  const { checking } = useGetSustainabilityCaseCheckStatus();

  return useMemo(() => {
    const list = (() => {
      if (checking) {
        return checkingCoverageList;
      }
      return coverageList;
    })();
    return lodash.filter(
      list,
      (item: any) => item.jointLifeNo === '00' || lodash.isNil(item.jointLifeNo)
    );
  }, [coverageList, checkingCoverageList, checking]);
};
