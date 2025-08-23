import lodash from 'lodash';
import useGetLoadingInfo from './useGetLoadingInfo';
import { formUtils } from 'basic/components/Form';
// import OwbLoadingCode from 'process/NewBusiness/Enum/OwbLoadingCode';

import { OwbLoadingCode } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { useMemo } from 'react';

export default (coverageId: string, loadingId: string, expectLoadingCode: string) => {
  const loadingInfo = useGetLoadingInfo(coverageId, loadingId);
  return useMemo(() => {
    const isCopyLoading = !lodash.isEmpty(loadingInfo.copyId);
    const { owbLoadingCode } = loadingInfo;
    const extraMortality = formUtils.queryValue(loadingInfo.extraMortality);
    const emPeriod = formUtils.queryValue(loadingInfo.emPeriod);
    const flatMortality = formUtils.queryValue(loadingInfo.flatMortality);
    const fmPeriod = formUtils.queryValue(loadingInfo.fmPeriod);
    const pmLoading = formUtils.queryValue(loadingInfo.pmLoading);
    const pmPeriod = formUtils.queryValue(loadingInfo.pmPeriod);

    /**
     * EM
     * extraMortality
     * emPeriod
     *
     * FM
     * EM% -> flatMortality
     * Duration -> fmPeriod
     *
     * PM
     * PM Loading -> pmLoading
     * PM Period -> pmPeriod
     */

    if (!isCopyLoading) {
      return true;
    } else {
      switch (expectLoadingCode) {
        case OwbLoadingCode.EM: {
          return !lodash.isNil(extraMortality) || !lodash.isNil(emPeriod);
        }
        case OwbLoadingCode.FM: {
          return !lodash.isNil(flatMortality) || !lodash.isNil(fmPeriod);
        }
        case OwbLoadingCode.PM: {
          return !lodash.isNil(pmLoading) || !lodash.isNil(pmPeriod);
        }
        default:
          return false;
      }
    }
  }, [loadingInfo]);
};
