import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './FormButton.less';
import { Button, Icon, Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SendIcon } from 'bpm/assets/sent.svg';
import { ReactComponent as BackIcon } from 'bpm/assets/back.svg';
import lodash from 'lodash';
import { isDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

const { confirm } = Modal;

interface IProps {
  previewCurrentReason: Object;
}

export default function FormButton(props: IProps) {
  const dispatch = useDispatch();
  const { previewCurrentReason } = props;
  const { status, sendControl } = previewCurrentReason;

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
      setTimeout(() => {
        dispatch({
          type: 'envoyController/sendPreviewData',
        });
      }, 300);
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
      {isDraftReason(status) && sendControl && (
        <Button className={styles.button} type="primary" onClick={sendHandle} loading={sendLoading}>
          <Icon className={styles.icon} component={SendIcon} />
          {formatMessageApi({
            Label_Sider_Envoy: 'Send',
          })}
        </Button>
      )}
      <Button className={styles.button} onClick={revertHandle} loading={revertLoading}>
        <Icon type="history" className={styles.icon} />
        Revert Email Fields
      </Button>
      <Button className={styles.button} onClick={backHandle}>
        <Icon component={BackIcon} className={styles.icon} />
        Back
      </Button>
    </div>
  );
}
