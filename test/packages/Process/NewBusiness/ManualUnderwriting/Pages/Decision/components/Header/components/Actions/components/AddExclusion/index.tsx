import React from 'react';
import { Button } from 'antd';
import useHandleOpenExclusionModal from './_hooks/useHandleOpenExclusionModal';
import useHaveSorNSUwDecision from './_hooks/useHaveSorNSUwDecision';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';
import styles from '../../index.less';
import AddExclusionModal from './AddExclusionModal';

const AddExclusion = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_AddExclusion';
  const haveUwDecision = useHaveSorNSUwDecision();
  const handleOpenExclusionAddModal = useHandleOpenExclusionModal(haveUwDecision);

  return (
    <>
      <AuthorizedAtom currentAuthority={currentAuthority} key="RS_NB_Button_ManualUW_AddExclusion">
        <Button className={styles.element} onClick={handleOpenExclusionAddModal}>
          Add Exclusion
        </Button>
      </AuthorizedAtom>
      <AddExclusionModal />
    </>
  );
};

AddExclusion.displayName = 'addExclusion';

export default AddExclusion;
