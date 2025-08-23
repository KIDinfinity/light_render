import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleOpenAddLoadingModalCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleOpenAddLoadingModalCallback';
import useHaveNonStandardUwDecision from 'process/NB/ManualUnderwriting/_hooks/useHaveNonStandardUwDecision';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

const AddLoading = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_AddLoading';
  const haveNonStandardUwDecision = useHaveNonStandardUwDecision();
  const handleOpenLoadingModal = useHandleOpenAddLoadingModalCallback({
    haveNonStandardUwDecision,
  });
  return (
    <AuthorizedAtom currentAuthority={currentAuthority} key="RS_NB_Button_ManualUW_AddLoading">
      <Button onClick={handleOpenLoadingModal}>
        {formatMessageApi({
          Label_BPM_Button: 'AddLoading',
        })}
      </Button>
    </AuthorizedAtom>
  );
};

AddLoading.displayName = 'addLoading';

export default AddLoading;
