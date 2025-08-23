import React from 'react';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EReasonStatus, EMemoStatus } from 'bpm/pages/Envoy/enum';
import styles from './pendingMemo.less';

const showReceive = ({ memoStatus = '', status, disabled }) => {
  const isResolved = status === EReasonStatus.RESOLVED;
  const isWaived = status === EReasonStatus.WAIVED;
  return ((status === EReasonStatus.ACTIVE && !disabled) || isResolved || isWaived) && memoStatus;
};
export { showReceive };

export default ({
  memoStatus = '',
  status,
  id,
  disabled,
  onChangeReceived,
}: {
  id: string | undefined;
  memoStatus: string;
  name?: string;
  status: string;
  idx: number;
  disabled: boolean;
  onChangeReceived: any;
}) => {
  const isReceived = memoStatus === EMemoStatus.RECEIVED;
  const isResolved = status === EReasonStatus.RESOLVED;
  const isWaived = status === EReasonStatus.WAIVED;

  const loading = useSelector(
    (state: any) => state.loading.effects['envoyController/setMemoStatus']
  );

  return (
    <>
      {((status === EReasonStatus.ACTIVE && !disabled) || isResolved || isWaived) && memoStatus && (
        <div
          className={classnames({
            [styles.received]: true,
            [styles.isReceived]: isReceived,
            [styles.isWaived]: isWaived,
            [styles.disabled]: !!loading,
            [styles.canReceive]: !isReceived && status === EReasonStatus.ACTIVE && !disabled,
          })}
          onClick={() => {
            if (loading) return;
            if (isReceived || isResolved || isWaived) return;
            onChangeReceived({
              pendingMemoId: id,
              memoStatus: isReceived ? EMemoStatus.NOTRECEIVED : EMemoStatus.RECEIVED,
            });
          }}
        >
          <Icon
            type="check-circle"
            theme={isReceived ? 'filled' : undefined}
            className={styles.icon}
          />
          <div className={styles.text}>
            {formatMessageApi({
              Label_Sider_Envoy: isReceived ? 'MemoStatus01' : 'MemoStatus02',
            })}
          </div>
        </div>
      )}
    </>
  );
};
