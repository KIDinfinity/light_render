import React from 'react';
import lodash from 'lodash';
import Item from './Item';
import styles from './index.less';

function TimeLine({ timeList, handleVersionClick, isAudit, isEditable }: any) {
  return (
    <div className={styles.timeLine}>
      {lodash.map(timeList, (item: any) => (
        <Item
          key={item.id}
          item={item}
          handleVersionClick={handleVersionClick}
          isAudit={isAudit}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
}

export default TimeLine;
