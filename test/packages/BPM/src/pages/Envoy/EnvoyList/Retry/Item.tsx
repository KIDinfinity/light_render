import React, { useCallback, useMemo } from 'react';
import { Icon, Tooltip } from 'antd';
import { useDispatch } from 'dva';
import classNames from 'classnames';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as TimeIcon } from 'bpm/assets/info.svg';
import useLoading from 'basic/hooks/useLoading';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './item.less';
import { EnovyRetryTypes } from 'bpm/pages/Envoy/enum.ts';

export default ({ item }: any) => {
  const dispatch = useDispatch();
  const { loading, setLoading } = useLoading();
  const handlerRetry = useCallback(async (param: any) => {
    if (param.canRetry) {
      setLoading(true);
      await dispatch({
        type: 'envoyController/sendRetry',
        payload: {
          param,
          updateRetryList: true,
        },
      });
      setLoading(false);
    }
  }, []);
  const canRetryFlag = useMemo(() => {
    const { executeStatus, canRetry } = item;
    if (
      executeStatus === EnovyRetryTypes.WAIT ||
      executeStatus === EnovyRetryTypes.HOLD ||
      canRetry !== true
    ) {
      return false;
    }
    return true;
  }, []);

  const OperationComponent = useCallback(() => {
    const { executeStatus, holdingConfig } = item;
    //如果是hold需要展示一个时间提示，如果是waiting或者不能retry，不做展示
    if (executeStatus === EnovyRetryTypes.HOLD) {
      let ruTriggerTime = '';
      try {
        ruTriggerTime = JSON.parse(holdingConfig)?.ruTriggerTime;
      } catch (e) {
        ruTriggerTime = 'hold';
      }
      return (
        <Tooltip
          title={
            <>
              <div className={styles.tooltip}>{ruTriggerTime}</div>
            </>
          }
        >
          <Icon component={TimeIcon} className={styles.infoIcon} />
        </Tooltip>
      );
    }
    return <></>;
  }, []);

  return (
    <>
      <div className={styles.item} key={item.id}>
        <div
          className={styles.label}
          title={formatMessageApi({ DropDown_ENV_FunctionCode: item?.functionCode })}
        >
          {formatMessageApi({ DropDown_ENV_FunctionCode: item?.functionCode })}
        </div>
        {canRetryFlag ? (
          loading ? (
            <Icon
              type="loading"
              className={classNames(styles.icon, { [styles.editable]: item.canRetry })}
            />
          ) : (
            <Icon
              component={RetryIcon}
              onClick={() => handlerRetry(item)}
              className={classNames(styles.icon, { [styles.editable]: item.canRetry })}
            />
          )
        ) : (
          <OperationComponent />
        )}
      </div>
    </>
  );
};
