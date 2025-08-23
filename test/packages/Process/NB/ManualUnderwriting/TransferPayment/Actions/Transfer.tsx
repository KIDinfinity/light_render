import React from 'react';
import StateFulButton from 'basic/components/StateFulButton';
import useHandlePaymentTransferCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePaymentTransferCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useLoading from 'basic/hooks/useLoading';
import useGetTransferButtonDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetTransferButtonDisabled';
import useGetTransferButtonWarning from 'process/NB/ManualUnderwriting/_hooks/useGetTransferButtonWarning';

const Transfer = () => {
  const { loading, setLoading } = useLoading();
  const handleTransfer = useHandlePaymentTransferCallback({ setLoading });
  const disabled = useGetTransferButtonDisabled();
  const warning = useGetTransferButtonWarning();
  const message = formatMessageApi({
    Label_COM_WarningMessage: 'MSG_000867',
  });
  return (
    <>
      <StateFulButton
        type="primary"
        onClick={handleTransfer}
        loading={loading}
        disabled={disabled}
        warning={warning}
        message={message}
      >
        {formatMessageApi({
          Label_BIZ_policy: 'transfer',
        })}
      </StateFulButton>
    </>
  );
};

export default Transfer;
