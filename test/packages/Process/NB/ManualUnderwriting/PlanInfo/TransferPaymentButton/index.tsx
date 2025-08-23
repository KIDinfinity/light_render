import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleOpenTransferPaymentModal from 'process/NB/ManualUnderwriting/_hooks/useHandleOpenTransferPaymentModal';
import StateFulButton from 'basic/components/StateFulButton';
import useGetTransferModalButtonWarning from 'process/NB/ManualUnderwriting/_hooks/useGetTransferModalButtonWarning';

export default () => {
  const handleOpenModal = useHandleOpenTransferPaymentModal();
  const wanrning = useGetTransferModalButtonWarning();
  const message = formatMessageApi({
    Label_COM_WarningMessage: 'MSG_000868',
  });
  return (
    <StateFulButton onClick={handleOpenModal} warning={wanrning} message={message}>
      {formatMessageApi({
        Label_BIZ_policy: 'transferPayment',
      })}
    </StateFulButton>
  );
};
