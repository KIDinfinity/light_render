import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './FormButton.less';
import { Button, Icon, Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import { ReactComponent as BackIcon } from 'bpm/assets/back.svg';
import lodash from 'lodash';
const { confirm } = Modal;

export default function FormButton() {
  const dispatch = useDispatch();
  const sendLoading = useSelector(
    (state) => state.loading.effects['envoyController/sendPreviewData'],
    shallowEqual
  );
  const revertLoading = useSelector(
    (state) => state.loading.effects['envoyController/revertPreivewModeData'],
    shallowEqual
  );
  const isChange = useSelector(
    ({ envoyController }: any) => envoyController.isChange,
    shallowEqual
  );
  const sendHandle = useCallback(async () => {
    const hasError = await dispatch({
      type: 'envoyController/validatePreview',
    });

    if (lodash.isEmpty(hasError)) {
      await dispatch({
        type: 'envoyController/sendPreviewData',
      });
    }
  }, []);

  const revertHandle = useCallback(async () => {
    dispatch({
      type: 'envoyController/revertPreivewModeData',
    });
  }, []);

  const backHandle = useCallback(() => {
    if (!isChange) {
      dispatch({
        type: 'envoyController/clearPreivewModeData',
      });
      return;
    }
    confirm({
      title: formatMessageApi({
        Label_COM_WarningMessage: 'MSG_000882',
      }),
      onOk() {
        dispatch({
          type: 'envoyController/clearPreivewModeData',
        });
      },
    });
  }, [isChange]);

  return (
    <div className={styles.buttonBox}>
      <Button className={styles.button} type="primary" onClick={sendHandle} loading={sendLoading}>
        <Icon className={styles.icon} component={SendIcon} />
        {formatMessageApi({
          Label_Sider_Envoy: 'Send',
        })}
      </Button>
      <Button className={styles.button} onClick={revertHandle} loading={revertLoading}>
        <Icon type="history" className={styles.icon} />
        Revert Changes
      </Button>
      <Button className={styles.button} onClick={backHandle}>
        <Icon component={BackIcon} className={styles.icon} />
        Back
      </Button>
    </div>
  );
}
