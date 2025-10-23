import { formUtils } from 'basic/components/Form';
import OWBLoadingCode from '../_enum/OWBLoadingCode';
import lodash from 'lodash';

export default (coverageLoading: any) => {
  if (!coverageLoading) {
    return null;
  }
  const { extraMortality, emPeriod, pmLoading, pmPeriod, flatMortality, fmPeriod } =
    coverageLoading;

  let newOwbLoadingCode = null;
  if (
    !lodash.isNil(formUtils.queryValue(extraMortality)) ||
    !lodash.isNil(formUtils.queryValue(emPeriod))
  ) {
    newOwbLoadingCode = OWBLoadingCode.EM;
  } else if (
    !lodash.isNil(formUtils.queryValue(pmLoading)) ||
    !lodash.isNil(formUtils.queryValue(pmPeriod))
  ) {
    newOwbLoadingCode = OWBLoadingCode.PM;
  } else if (
    !lodash.isNil(formUtils.queryValue(flatMortality)) ||
    !lodash.isNil(formUtils.queryValue(fmPeriod))
  ) {
    newOwbLoadingCode = OWBLoadingCode.FM;
  }

  return newOwbLoadingCode;
};
