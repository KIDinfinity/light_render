import React from 'react';
import { Button } from 'antd';
import useHandleEditingChequeInfo from 'process/NB/Share/hooks/useHandleEditingChequeInfo';
import useGetChequeVerifyButtonDisabled from 'process/NB/Share/hooks/useGetChequeVerifyButtonDisabled';

const Edit = () => {
  const handleEdit = useHandleEditingChequeInfo();
  const disabled = useGetChequeVerifyButtonDisabled();
  return (
    <Button onClick={handleEdit} disabled={disabled}>
      Edit
    </Button>
  );
};

Edit.displayName = 'Edit';

export default Edit;
