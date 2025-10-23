import React from 'react';
import { Button } from 'antd';
import useGetChequeVerifyButtonDisabled from 'process/NB/Share/hooks/useGetChequeVerifyButtonDisabled';
import useHandleRefresh from 'process/NB/Share/hooks/useHandleRefresh';

const Refresh = () => {
  const handleRefresh = useHandleRefresh();
  const disabled = useGetChequeVerifyButtonDisabled();
  return (
    <Button
      onClick={() => {
        handleRefresh();
      }}
      disabled={disabled}
    >
      Refresh
    </Button>
  );
};

Refresh.displayName = 'Refresh';

export default Refresh;
