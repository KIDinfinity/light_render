import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const docViewVOList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.docViewVOList
    ) || [];

  return useMemo(() => {
    return lodash
      .chain(docViewVOList || [])
      .reduce((arr: any, item: any) => {
        const hasFormCategory = lodash.find(
          arr,
          (el: any) => el.formCategory === item.formCategory
        );

        return !!hasFormCategory
          ? lodash.map(arr, (el: any) => {
              return el.formCategory === item.formCategory
                ? {
                    ...el,
                    documentList: [...el.documentList, item],
                  }
                : el;
            })
          : [
              ...arr,
              {
                formCategory: item.formCategory,
                documentList: [item],
              },
            ];
      }, [])

      .value();
  }, [docViewVOList]);
};
