import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ role }: any) => {
  const coverageList = useSelector(({ insured360 }: any) => insured360?.coverageList);
  const monthPeriod = useSelector(({ insured360 }: any) => insured360?.monthPeriod);
  const tsarCalculationCategoryDisplayPeriod =
    useSelector(({ insured360 }: any) => insured360?.tsarCalculationCategoryDisplayPeriod) || [];

  return useMemo(() => {
    const targetList = lodash
      .chain(coverageList)
      .filter((coverageItem) => {
        if (
          lodash.includes(
            tsarCalculationCategoryDisplayPeriod,
            coverageItem.tsarCalculationCategory
          )
        ) {
          const isMEDCoverageItem = lodash.filter([coverageItem], {
            displayStyle: 'right',
            monthPeriod: 'ALL',
            roleInd: role,
          });
          return !lodash.isEmpty(isMEDCoverageItem);
        }
        const isCoverageItem = lodash.filter([coverageItem], {
          displayStyle: 'right',
          monthPeriod,
          roleInd: role,
        });
        return !lodash.isEmpty(isCoverageItem);
      })
      .map((item) => ({
        ...item,
        coverageType: formatMessageApi({
          Label_Slider_360: item.coverageType,
        }),
      }))
      .sortBy(['tsarCalculationCategory', 'coverageStatus'])
      .value();

    const cellMap = lodash
      .chain(targetList)
      .groupBy('tsarCalculationCategory')
      .reduce((result, item, key) => {
        result[key] = {
          firstKey: lodash.findIndex(targetList, { tsarCalculationCategory: key }),
          size: lodash.size(item),
        };
        return result;
      }, {})
      .value();

    const omits = ['id', 'currency', 'displayStyle', 'monthPeriod', 'roleInd'];
    const orderMap = {
      tsarCalculationCategory: 1,
      tsar: 10,
    };
    const columns = lodash
      .chain(targetList)
      .head()
      .omit(omits)
      .keys()
      .reduce((result: any, key: any) => {
        if (lodash.some(targetList, (someItem: any) => someItem?.[key])) {
          const temp: any = {
            key: key,
            dataIndex: key,
            render: (text: any) => {
              return lodash.isNumber(text)
                ? fnPrecisionFormat(fnPrecisionParser(parseFloat(text)))
                : text || 'NULL';
            },
            title: formatMessageApi({
              Label_BIZ_Policy: key,
            }),
          };
          if (key === 'tsarCalculationCategory') {
            temp.render = (value, row, index) => {
              const obj = {
                children: formatMessageApi({
                  Label_Slider_360: value,
                }),
                props: {},
              };
              const cell = cellMap?.[value];
              if (cell) {
                if (index === cell?.firstKey) {
                  obj.props.rowSpan = cell?.size || 1;
                  obj.props.className = 'alignTop';
                } else {
                  obj.props.rowSpan = 0;
                }
              }
              return obj;
            };
          }
          result.push(temp);
        }
        return result;
      }, [])
      .sortBy((item: any) => {
        return orderMap?.[item.key] || 3;
      })
      .value();

    return { columns, dataSource: targetList };
  }, [role, coverageList, monthPeriod]);
};
