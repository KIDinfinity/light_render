import React from 'react';
import useLoadProposalFlag from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlag';
import ButtonList from './ButtonList';
import SustainabilityCaseModal from 'process/NB/ManualUnderwriting/SustainabilityCaseModal';
import styles from './index.less';

const ReButton = () => {
  useLoadProposalFlag();
  return (
    <div className={styles.wrap}>
      <ButtonList />
      <SustainabilityCaseModal />
    </div>
  );
};

ReButton.displayName = 'reButton';

export default ReButton;
