import React from 'react';
import { NAMESPACE } from '../activity.config';

import lodash from 'lodash';
import { useSelector } from 'dva';
import BenefitItemItem from './BenefitItemItem';
import styles from './index.less';

const BenefitItem = () => {
  const benefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.benefitListMap
  );

  return (
    <div className={styles.benefitiList}>
      {lodash.compact(lodash.values(benefitListMap)).map((item: any, index: number) => (
        <div key={item.id} className={styles.benefitItem}>
          <BenefitItemItem data={item} index={index} />
        </div>
      ))}
    </div>
  );
};

export default BenefitItem;
