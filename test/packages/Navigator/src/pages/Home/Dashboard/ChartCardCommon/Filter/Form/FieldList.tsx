import React from 'react';
import lodash, { filter, slice } from 'lodash';
import mapprops from '@/utils/mapprops';
import { getSearchItem } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import styles from './FieldList.less';

const getLength = (length: number) => {
  return length % 4 === 0 ? length / 4 : Math.floor(length / 4) + 1;
};

export default ({ form, searchDatas, dashboardSearchFieldList }: any) => {
  const newSearch = filter(
    dashboardSearchFieldList,
    (item: any) => item.visible && item.visible !== 2
  );
  const searchFieldList = mapprops(
    getSearchItem(
      newSearch,
      {
        ...searchDatas,
      },
      {
        getPopupContainer: '',
        getCalendarContainer: '',
        isShowAll: true,
        colon: false,
        form,
      },
      'componentSequence'
    ),
    { form }
  );
  const length = getLength(searchFieldList?.length);
  return (
    <div className={styles.fieldList}>
      {
        new lodash.map(Array(length).fill(1), (item: any, index: number) => (
          <div key={`searchForm_${index}`} className={styles.wrap}>
            {slice(searchFieldList, index * 4, (index + 1) * 4)}
          </div>
        ))
      }
    </div>
  );
};
