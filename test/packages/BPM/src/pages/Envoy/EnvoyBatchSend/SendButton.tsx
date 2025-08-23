import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import { ReactComponent as ErrorIcon } from 'bpm/assets/error.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetBatchSendEnvoyDisabled from 'bpm/pages/Envoy/hooks/useGetBatchSendEnvoyDisabled';
import useHandleBatchSendEnvoyCallback from 'bpm/pages/Envoy/hooks/useHandleBatchSendEnvoyCallback';

const SendButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const disabled = useGetBatchSendEnvoyDisabled();
  const handleSend = useHandleBatchSendEnvoyCallback({ setLoading, setError });
  return (
    <Button disabled={disabled} onClick={handleSend} loading={loading}>
      {error ? <Icon component={ErrorIcon} /> : <Icon component={SendIcon} />}
      {formatMessageApi({
        Label_Sider_Envoy: 'Send',
      })}
    </Button>
  );
};

SendButton.displayName = 'sendButton';

export default SendButton;
