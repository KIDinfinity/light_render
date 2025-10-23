import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default ({ coreCode }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const jointLifeNoSet = new Set();
    lodash
      .chain(coverageList)
      .filter((coverage: any) => {
        return formUtils.queryValue(coverage?.coreCode) === coreCode;
      })
      .filter((coverage) => {
        return lodash
          .chain(coverage)
          .get('coverageInsuredList', [])
          .some((insured: any) => Number(insured?.unionInsuredSeqNum) > 1)
          .value();
      })
      .forEach((coverage: any) => {
        lodash
          .chain(coverage)
          .get('coverageInsuredList', [])
          .forEach((insured: any) => {
            jointLifeNoSet.add({
              insuredId: insured?.clientId,
              decision: formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision')),
            });
          })
          .value();
      })
      .value();

    return Array.from(jointLifeNoSet);
  }, [coverageList, coreCode]);
};
