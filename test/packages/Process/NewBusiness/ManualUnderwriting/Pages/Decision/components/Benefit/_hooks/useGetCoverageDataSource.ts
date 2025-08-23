import { useMemo } from 'react';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetIncreasedCoverageList from './useGetIncreasedCoverageList';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export default (type?: string) => {
  const coverageList = useGetCoverageList(type);

  const checkingCoverageList = useGetIncreasedCoverageList();
  const { checking } = useGetSustainabilityCaseCheckStatus();

  return useMemo(() => {
    if (!!checking) {
      return checkingCoverageList;
    }
    return coverageList;
  }, [coverageList, checkingCoverageList, checking]);
};
