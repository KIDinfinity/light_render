import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import PayableItem from './PayableItem';

import styles from './style.less';

interface IProps {
  payableList: any[];
}

const PayableInfo: FunctionComponent<IProps> = ({ payableList }) => {
  return (
    <div className={styles.payableList}>
      {lodash.map(payableList, (item: any, index: number) => (
        <PayableItem payableItem={item} key={`${item.id}-${index}`} />
      ))}
    </div>
  );
};

export default connect()(PayableInfo);
