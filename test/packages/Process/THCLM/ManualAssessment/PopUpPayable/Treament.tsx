import React from 'react';
import lodash from 'lodash';
import TreamentItem from './TreamentItem';
import styles from './index.less';

const Treament = ({ listMap, benefitItemId }: any) => {
  return (
    <div className={styles.service}>
      {lodash.compact(lodash.values(listMap)).map((item: any, index: number) => (
        <TreamentItem key={item.id} benefitItemId={benefitItemId} data={item} index={index} />
      ))}
    </div>
  );
};

export default Treament;
