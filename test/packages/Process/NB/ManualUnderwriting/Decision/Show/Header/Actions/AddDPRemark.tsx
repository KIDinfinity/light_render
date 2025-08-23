import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleOpenAddDPRemarkModalCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleOpenAddDPRemarkModalCallback';
import useHaveDPUwDecision from 'process/NB/ManualUnderwriting/_hooks/useHaveDPUwDecision';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

const AddDPRemark = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_Decline/PostponeRemark';
  const haveDPUwDecision = useHaveDPUwDecision();
  const handleOpenLoadingModal = useHandleOpenAddDPRemarkModalCallback({
    haveDPUwDecision,
  });
  return (
    <AuthorizedAtom
      currentAuthority={currentAuthority}
      key="RS_NB_Button_ManualUW_Decline/PostponeRemark"
    >
      <Button onClick={handleOpenLoadingModal}>
        {formatMessageApi({
          Label_BPM_Button: 'AddPostponeDeclineRemark',
        })}
      </Button>
    </AuthorizedAtom>
  );
};

AddDPRemark.displayName = 'addDPRemark';

export default AddDPRemark;
