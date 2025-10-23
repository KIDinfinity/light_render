import React from 'react';
import ClientShow from './Show';
import ClientEdit from './Edit';
import ClientEditPlainMode from './ClientEditPlainMode';
import styles from './index.less';
import MUErrorBoundary from '../../_components/MUErrorBoundary';

export default ({ editMode }: any) => {
  return (
    <MUErrorBoundary panelName="Client">
      <div className={styles.clientContainer}>
        <ClientShow editMode={editMode} />
        {editMode === 'plain' ? <ClientEditPlainMode editMode={editMode} /> : <ClientEdit />}
      </div>
    </MUErrorBoundary>
  );
};
