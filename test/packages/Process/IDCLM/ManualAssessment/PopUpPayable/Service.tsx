import React from 'react';
import lodash from 'lodash';
import ServiceItem from './ServiceItem';

import styles from './index.less';

const Service = ({ listMap, benefitItemId }: any) => {
  return (
    <div className={styles.service}>
      {lodash.compact(lodash.values(listMap)).map((item: any) => (
        <ServiceItem key={item.id} benefitItemId={benefitItemId} data={item} />
      ))}
    </div>
  );
};

export default Service;
