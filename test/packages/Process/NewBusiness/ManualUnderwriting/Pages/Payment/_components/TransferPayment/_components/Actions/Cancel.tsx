import React, { useState, useMemo } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { TransferPaymentStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';

export default () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cancelButtonStyle = {
    color: 'white',
    backgroundColor: '#9F9E9E',
    borderColor: '#9F9E9E',
    margin: '0 8px',
  };

  const premiumTransferList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData?.processData?.premiumTransferList
    ) || [];

  const disabled = useMemo(() => {
    return lodash.every(premiumTransferList, (item: any) => {
      return item?.status === TransferPaymentStatus.Success;
    });
  }, [premiumTransferList]);
  return (
    <>
      <Button
        style={cancelButtonStyle}
        onClick={async () => {
          setLoading(true);
          await dispatch({
            type: `${NAMESPACE}/setTransferData`,
            payload: {
              type: 'cancel',
            },
          });
          setLoading(false);
        }}
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
