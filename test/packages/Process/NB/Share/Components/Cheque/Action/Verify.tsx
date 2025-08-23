import React, { useState } from 'react';
import { Button } from 'antd';
import lodash from 'lodash';

import useVerifyChequeInfoCallback from 'process/NB/Share/hooks/useVerifyChequeInfoCallback';
import useGetChequeVerifyButtonDisabled from 'process/NB/Share/hooks/useGetChequeVerifyButtonDisabled';

const Verify = ({useHandleRefreshCallback}: any) => {
  const [loading, setLoading] = useState(false);
  const disabled = useGetChequeVerifyButtonDisabled();
  const callback = lodash.isFunction(useHandleRefreshCallback) && useHandleRefreshCallback({setLoading, loading})
  const handleVerify = useVerifyChequeInfoCallback(callback);
  return (
    <Button onClick={handleVerify} disabled={disabled} loading={loading}>
      Verify
    </Button>
  );
};

Verify.displayName = 'Verify';

export default Verify;
