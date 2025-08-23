import React from 'react';
import lodash from 'lodash';

import styles from './PolicyItem.less';
import PolicyContainerHeader from './PolicyContainerHeader';
import PolicyContainerContext from './PolicyContainerContext';

export default ({ item }: any) => {

  const exclusionTexts = lodash.chain(item).pick(['exclusionText1', 'exclusionText2', 'exclusionText3']).values().compact().value()

  return (
    <div className={styles.policyContainer}>
      <PolicyContainerHeader exclusionCategory={item?.exclusionCategory} currentFrom={item?.currentFrom} currentTo={item?.currentTo} />
      <PolicyContainerContext exclusionTexts={exclusionTexts} />
    </div>
  );
};
