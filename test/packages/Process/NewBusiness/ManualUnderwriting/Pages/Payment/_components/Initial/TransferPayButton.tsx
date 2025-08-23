import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import StateFulButton from 'basic/components/StateFulButton';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { TransferPaymentStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';

export default () => {
  const dispatch = useDispatch();

  const premiumTransferList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.premiumTransferList
    ) || [];

  const showWarn = useMemo(() => {
    return !lodash.every(premiumTransferList, ({ status }: any) => {
      return [TransferPaymentStatus.Success, TransferPaymentStatus.Cancel].includes(status);
    });
  }, [premiumTransferList]);

  return (
    <StateFulButton
      onClick={() => {
        dispatch({
          type: `${NAMESPACE}/saveShowTransferPayment`,
          payload: {
            show: true,
          },
        });
        dispatch({
          type: `${NAMESPACE}/savePremiumTransferList`,
          payload: {
            premiumTransferList,
          },
        });
        dispatch({
          type: `${NAMESPACE}/getRefreshPaymentAmount`,
          payload: {
            init: true,
          },
        });
      }}
      warning={showWarn}
      message={formatMessageApi({
        Label_COM_WarningMessage: 'MSG_000868',
      })}
    >
      {formatMessageApi({
        Label_BIZ_policy: 'transferPayment',
      })}
    </StateFulButton>
  );
};
