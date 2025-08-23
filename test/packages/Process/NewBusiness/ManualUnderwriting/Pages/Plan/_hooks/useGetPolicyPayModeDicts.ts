import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ config }: any) => {
  const fullDicts = getDrowDownList({ config });

  const coverageList =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList) || [];

  const mainCoverage = lodash.find(coverageList, ({ isMain }: any) => isMain === 'Y') || {};

  const productCode = formUtils.queryValue(mainCoverage?.coreCode);

  return useMemo(() => {
    const hierachyOccupationGroupDicts = getDrowDownList(
      `hierarchyDicts.productCode.${productCode}`
    );
    if (hierachyOccupationGroupDicts?.length > 0) {
      return hierachyOccupationGroupDicts;
    }
    return fullDicts;
  }, [productCode, fullDicts]);
};
