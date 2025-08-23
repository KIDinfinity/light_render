import React  from 'react';

import ClientShow from './Show';
import ClientEdit from './Edit';

import styles from './index.less';
import MUErrorBoundary from '../../_components/MUErrorBoundary';


export default () => {
  return (
    <MUErrorBoundary panelName="Client">
      <div className={styles.clientContainer}>
        <ClientShow />
        <ClientEdit />
      </div>
    </MUErrorBoundary>
  );
};
