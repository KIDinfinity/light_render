import { useMemo } from 'react';
import { useSelector } from 'dva';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ tsarCalculationCategory, monthPeriod, selectedRoleInd }: any) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360.coverageList) || [];
  const tsarCalculationCategoryDisplayPeriod =
    useSelector(({ insured360 }: any) => insured360?.tsarCalculationCategoryDisplayPeriod) || [];
  const targetMonthPeriod = (() => {
    if (lodash.includes(tsarCalculationCategoryDisplayPeriod, tsarCalculationCategory)) {
      return 'ALL';
    }
    return monthPeriod;
  })();
  return useMemo(() => {
    const targetList = lodash
      .chain(coverageList)
      .filter({
        tsarCalculationCategory,
        monthPeriod: targetMonthPeriod,
        roleInd: selectedRoleInd,
        displayStyle: 'left',
      })
      .filter((el: any) => el.coverageType !== 'ALL' && el.coverageStatus !== 'ALL')
      .value();

    const coverageTypeSet = new Set([
      'Benefit',
      ...lodash.map(targetList, (item) => item.coverageStatus),
    ]);
    const columns = Array.from(coverageTypeSet).map((item) => ({
      key: item,
      title: item,
      dataIndex: item,
      width: 100,
      render: (text: any) => {
        return lodash.isNumber(text)
          ? fnPrecisionFormat(fnPrecisionParser(parseFloat(text)))
          : text;
      },
    }));

    const dataSource = lodash
      .chain(targetList)
      .groupBy('coverageType')
      .map((item, key) => {
        const temp = lodash.reduce(
          item,
          (result, reduceItem) => {
            result[reduceItem.coverageStatus] = reduceItem.tsar;
            return result;
          },
          {}
        );
        return {
          Benefit: formatMessageApi({ Label_Slider_360: key }),
          key: key,
          ...temp,
        };
      })
      .value();

    return {
      columns,
      dataSource,
    };
  }, [coverageList, targetMonthPeriod, tsarCalculationCategory, selectedRoleInd]);
};
