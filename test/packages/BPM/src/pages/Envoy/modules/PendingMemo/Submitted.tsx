import React, { useCallback } from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import lodash from 'lodash';
import useHandleJudgeTaskStatusReload from 'bpm/pages/Envoy/hooks/useHandleJudgeTaskStatusReload';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EReasonStatus, ESubmitStatus } from 'bpm/pages/Envoy/enum';
import { tenant, Region } from '@/components/Tenant';
import styles from './pendingMemo.less';

const showSubmitted = ({ status, disabled }: any) => {
  const isResolved = status === EReasonStatus.RESOLVED;
  const isWaived = status === EReasonStatus.WAIVED;

  return (
    tenant.remoteRegion() === Region.HK &&
    ((status === EReasonStatus.ACTIVE && !disabled) || isResolved || isWaived)
  );
};

export { showSubmitted };

export default ({
  data,
  id,
  disabled,
  idx,
  expand = false,
}: {
  id: string | undefined;
  name?: string;
  data: {
    status: string;
    groupId: string;
    pendingMemoList: any;
  };
  idx: number;
  disabled: boolean;
  expand?: boolean;
}) => {
  const status = data?.status;
  const groupId = data?.groupId;
  const handleReload = useHandleJudgeTaskStatusReload();
  const dispatch = useDispatch();
  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
  const submitStatus = lodash.get(pendingMemoList, `[${idx}].submitStatus`);
  const submittedTime = lodash.get(pendingMemoList, `[${idx}].submittedTime`);

  const isSubmited = submitStatus === ESubmitStatus.Submitted;
  const isResolved = status === EReasonStatus.RESOLVED;
  const isWaived = status === EReasonStatus.WAIVED;

  const onChangeSubmited = useCallback(
    async ({ pendingMemoId }: any) => {
      await dispatch({
        type: 'envoyController/setSubmitStatus',
        payload: {
          groupId,
          pendingMemoId,
        },
      });
      handleReload();
    },
    [dispatch, groupId, handleReload]
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['envoyController/setSubmitStatus']
  );

  return (
    <>
      {showSubmitted({ status, disabled }) && (
        <div
          className={classnames({
            [styles.submitted]: true,
            [styles.received]: expand,
            [styles.isReceived]: isSubmited,
            [styles.disabled]: !!loading,
            [styles.canReceive]: !isSubmited && status === EReasonStatus.ACTIVE && !disabled,
          })}
          onClick={() => {
            if (loading) return;
            if (isSubmited || isResolved || isWaived) return;
            onChangeSubmited({
              pendingMemoId: id,
            });
          }}
        >
          <Icon
            type="check-circle"
            theme={isSubmited ? 'filled' : undefined}
            className={styles.icon}
          />
          <div>
            <div
              className={classnames({
                [styles.text]: true,
                [styles.submittedTime]: !!submittedTime,
              })}
            >
              {formatMessageApi({
                Label_BIZ_Claim: isSubmited ? 'Submitted' : 'NotSubmitted',
              })}
            </div>
            {submittedTime && (
              <div
                className={classnames({
                  [styles.submittedTime]: !!submittedTime,
                })}
              >
                {moment(submittedTime).format('L')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
