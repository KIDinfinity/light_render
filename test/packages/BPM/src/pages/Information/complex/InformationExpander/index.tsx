import { useSelector } from 'dva';
import lodash from 'lodash';
import React from 'react';
import Content from '../AddInformation/Content';
import styles from './index.less';

export default () => {
  const { activeEditTabs, addInformations } = useSelector(
    (state: any) => state.navigatorInformationController
  );
  const id = lodash.findLast(activeEditTabs);
  const item = lodash.find(addInformations, ['id', id]);

  return (
    <div className={styles.addinformation}>
      <Content item={item} />
    </div>
  );
};
