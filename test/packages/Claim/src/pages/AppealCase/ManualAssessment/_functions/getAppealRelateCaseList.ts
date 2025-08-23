import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const getAppealRelateCaseList = (appealRelateCase, claimAppealInfo) => {
  const { originalCaseCategory, claimType } = formUtils.cleanValidateData(claimAppealInfo);
  const claimTypeList = lodash.compact(lodash.split(claimType, ','));
  return lodash
    .chain(appealRelateCase)
    .filter((item) => {
      if (!originalCaseCategory && lodash.size(claimTypeList) === 0) return true;
      const claimTypeIncludes =
        lodash.size(claimTypeList) > 0
          ? lodash.every(claimTypeList, (claimTypeVal) =>
              lodash.chain(item.claimType).split(',').includes(claimTypeVal).value()
            )
          : true;
      const categoryEqual = originalCaseCategory
        ? item.originalCaseCategory === originalCaseCategory
        : true;
      return categoryEqual && claimTypeIncludes;
    })
    .compact()
    .value();
};

export { getAppealRelateCaseList };

export default getAppealRelateCaseList;
