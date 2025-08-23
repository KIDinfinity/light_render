import React from 'react';
import lodash from 'lodash';

import ListMultiple from './ListMultiple';
import ListItem from './ListItem';

import styles from './index.less';

const List = ({ benefitItemData }: any) => {
  return (
    <div className={styles.service}>
      {lodash.compact(lodash.values(benefitItemData?.listMap)).map((item: any, index: number) => (
        <div key={item.id}>
          {lodash.size(item?.childrenMap) === 1 && (
            <ListItem
              listMapItemId={item.id}
              chooise={item.chooise}
              data={lodash.values(item.childrenMap)[0]}
              index={index}
              benefitItemData={benefitItemData}
            />
          )}
          {lodash.size(item?.childrenMap) > 1 && (
            <ListMultiple
              key={item.id}
              data={item}
              listMapItemId={item.id}
              index={index}
              benefitItemData={benefitItemData}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
