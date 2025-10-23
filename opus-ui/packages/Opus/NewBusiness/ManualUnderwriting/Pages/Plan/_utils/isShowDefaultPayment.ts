import getCaseCompanyCode from 'packages/Opus/NewBusiness/ManualUnderwriting/_utils/getCaseCompanyCode';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
export default () => {
  const companyCode = getCaseCompanyCode();
  return companyCode === CompanyCode.IL;
};
