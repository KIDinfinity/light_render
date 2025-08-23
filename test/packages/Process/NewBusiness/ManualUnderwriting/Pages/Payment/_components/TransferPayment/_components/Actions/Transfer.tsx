import React, { useState, useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import StateFulButton from 'basic/components/StateFulButton';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { TransferPaymentStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';

import { formatMessageApi } from '@/utils/dictFormatMessage';

const Transfer = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const premiumTransferList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData?.processData?.premiumTransferList
    ) || [];

  const disabled = useMemo(() => {
    return lodash.every(
      premiumTransferList,
      ({ status }: any) => status === TransferPaymentStatus.Success
    );
  }, [premiumTransferList]);

  const warning = useMemo(() => {
    return lodash.some(premiumTransferList, (item: any) => {
      return item?.status === TransferPaymentStatus.Failed;
    });
  }, [premiumTransferList]);

  const message = formatMessageApi({
    Label_COM_WarningMessage: 'MSG_000867',
  });
  return (
    <>
      <StateFulButton
        type="primary"
        onClick={async () => {
          setLoading(true);
          await dispatch({
            type: `${NAMESPACE}/setTransferData`,
            payload: {
              type: 'transfer',
            },
          });
          setLoading(false);
        }}
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
