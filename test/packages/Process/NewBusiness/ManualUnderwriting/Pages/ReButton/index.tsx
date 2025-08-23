import React from 'react';
import { useSelector } from 'dva';
import useLoadProposalFlag from './_hooks/useLoadProposalFlag';
import ButtonList from './ButtonList';
import SustainabilityCaseModal from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal';
import AddLinkedPolicyModal from 'process/NewBusiness/ManualUnderwriting/Pages/AddLinkedPolicyModal';
import styles from './index.less';

const ReButton = () => {
  useLoadProposalFlag();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  if (taskNotEditable) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <ButtonList />
      <SustainabilityCaseModal />
      <AddLinkedPolicyModal />
    </div>
  );
};

ReButton.displayName = 'reButton';

export default ReButton;
