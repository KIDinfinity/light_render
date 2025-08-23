import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const renderDataItem = ({ item, el }: any) => {
  const configs = {
    caseCategory: 'Label_BPM_CaseCategory',
    activityKey: 'activity',
    businessType: 'Dropdown_COM_BusinessType',
    companyCode: 'Label_BPM_Entity',
  };
  return !lodash.isEmpty(configs[el])
    ? {
        dictName: formatMessageApi({
          [configs[el]]: item[el],
        }),
        dictCode: item[el],
      }
    : {
        dictName: item[el],
        dictCode: item[el],
      };
};

export default () => {
  const filterList = useSelector((state: any) => state.navigatorHomeWatching.filterList);
  const filterParams = useSelector((state: any) => state.navigatorHomeWatching.filterParams);
  return useMemo(() => {
    return (
      lodash
        .chain(filterList || [])
        .filter({ ...filterParams })
        /**
         * 重组数组
         * 原来:[{a:1,b:2},{d:4}]
         * 更变后：{a:[{dictCode:1,dictName:1}],b:[{dictCode:2,dictName:2}，{dictCode:4,dictName:4}]}
         */
        .reduce((obj: any, item: any) => {
          const keys = lodash.keys(item);

          const obj1 = lodash.reduce(
            keys,
            (obj1: any, el: any) => {
              return lodash.includes(lodash.keys(obj), el)
                ? {
                    ...obj1,
                    [el]:
                      lodash
                        .chain([...obj1[el], renderDataItem({ item, el })])
                        .unionBy('dictCode')
                        .value() || [],
                  }
                : {
                    ...obj1,
                    [el]:
                      lodash
                        .chain([renderDataItem({ item, el })])
                        .unionBy('dictCode')
                        .value() || [],
                  };
            },
            obj
          );

          return obj1;
        }, {})
        .value()
    );
  }, [filterList, filterParams]);
};
