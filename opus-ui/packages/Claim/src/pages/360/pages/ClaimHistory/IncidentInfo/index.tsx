import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentItem from './IncidentItem';

import styles from './style.less';

interface IProps {
  incidentList: any[];
}

const IncidentInfo: FunctionComponent<IProps> = ({ incidentList }) => {
  return (
    <div className={styles.incidentList}>
      {lodash.map(incidentList, (item: any, index: string) => (
        <IncidentItem incidentItem={item} key={`${item.id}-${index}`} />
      ))}
    </div>
  );
};

export default connect()(IncidentInfo);
