import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import SubProductType from 'process/NB/ManualUnderwriting/Enum/SubProductType';
import UnderWritingApproach from 'process/NB/ManualUnderwriting/Enum/UnderWritingApproach';
import CoverageType from 'process/NB/ManualUnderwriting/Enum/CoverageType';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { tenant, Region } from '@/components/Tenant';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

export default () => {
  const coverageList = useGetCoverageList();
  const regionCode = tenant.region();
  const isGBSN = useJudgeIsGBSN();
  return useMemo(() => {
    return (
      regionCode === Region.MY &&
      isGBSN &&
      lodash
        .chain(coverageList)
        .some((coverageItem: any) => {
          return (
            formUtils.queryValue(coverageItem?.isMain === CoverageType.BasicProduct) &&
            formUtils.queryValue(coverageItem?.underwritingApproach) !== UnderWritingApproach.SIO
          );
        })
        .value() &&
      lodash
        .chain(coverageList)
        .some((coverageItem: any) => {
          return (
            formUtils.queryValue(coverageItem?.isMain === CoverageType.Rider) &&
            formUtils.queryValue(coverageItem?.subProductType) === SubProductType.MedicalRider
          );
        })
        .value()
    );
  }, [coverageList, isGBSN]);
};
