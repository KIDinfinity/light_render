import lodash from 'lodash';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
import getCaseCompanyCode from 'packages/Opus/NewBusiness/ManualUnderwriting/_utils/getCaseCompanyCode';
import { formUtils } from 'basic/components/Form';

export default ({ exclusionList, productName, productCode }) => {
  const companyCode = getCaseCompanyCode();
  const dicts = lodash
    .chain(exclusionList)
    .filter(
      (item) =>
        item.productCode === formUtils.queryValue(productName) ||
        item.productCode === formUtils.queryValue(productCode) ||
        lodash.isEmpty(item.productCode)
    )
    .map((item: any) => {
      const dictName =
        companyCode === CompanyCode.LA
          ? item?.longDesc
          : item?.longDesc + ' - ' + item?.additionalInfo;
      return {
        dictCode: item?.localExclusionCode,
        dictName,
      };
    })
    .value();

  return dicts;
};
