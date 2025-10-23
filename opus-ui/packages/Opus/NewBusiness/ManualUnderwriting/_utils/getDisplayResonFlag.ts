import { useMemo } from 'react';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
import getCaseCompanyCode from 'packages/Opus/NewBusiness/ManualUnderwriting/_utils/getCaseCompanyCode';

export default () => {
  const companyCode = getCaseCompanyCode();
  return useMemo(() => {
    return companyCode === CompanyCode.IL;
  }, []);
};
