import React from 'react';

import ClientDetailLeft from './ClientDetailLeft';
import ClientDetailRight from './ClientDetailRight';
import ExpandButton from './ExpandButton';
import EditButton from './EditButton';

import styles from '../../index.less';

export default ({ clientId }: any) => {
  return (
    <div className={styles.clientDetail}>
      <ClientDetailLeft clientId={clientId} />
      <ClientDetailRight clientId={clientId} />
      <ExpandButton clientId={clientId} />
      <EditButton clientId={clientId} />
    </div>
  );
};
