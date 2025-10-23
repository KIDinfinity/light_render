import React from 'react';
import { Button } from 'antd';
import useHandlePaymentTransferCancelCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePaymentTransferCancelCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useLoading from 'basic/hooks/useLoading';
import useGetTransferButtonDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetTransferButtonDisabled';

export default () => {
  const cancelButtonStyle = {
    color: 'white',
    backgroundColor: '#9F9E9E',
    borderColor: '#9F9E9E',
    margin: '0 8px',
  };
  const { loading, setLoading } = useLoading();
  const handleCancel = useHandlePaymentTransferCancelCallback({ setLoading });
  const disabled = useGetTransferButtonDisabled();
  return (
    <>
      <Button
        style={cancelButtonStyle}
        onClick={handleCancel}
        loading={loading}
        disabled={disabled}
      >
        {formatMessageApi({
          Label_BIZ_policy: 'cancel',
        })}
      </Button>
    </>
  );
};
