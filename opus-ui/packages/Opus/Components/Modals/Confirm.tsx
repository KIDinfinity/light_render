import classNames from 'classnames';
import React from 'react';
import { Modal, Icon, Button } from 'packages/Opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as modalConfirm } from 'packages/Opus/Assets/icon-modal-confirm.svg';

import styles from './index.less';

const Main = ({
  show = false,
  title = '',
  handleCancle = () => {},
  handleConfirm = () => {},
  children = <></>,
  brightBorderCancel = false,
}: any) => {
  const footer = [
    <Button
      className={classNames({ [styles.brightBorderCancel]: brightBorderCancel })}
      key="Cancel"
      onClick={handleCancle}
    >
      {formatMessageApi({ Label_COM_Opus: 'cancel' })}
    </Button>,
    <Button key="submit" type="primary" onClick={handleConfirm}>
      {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
    </Button>,
  ];

  return (
    <Modal
      className={styles.modalWrap}
      title={
        <div className={styles.titleWrap}>
          <Icon component={modalConfirm} className={styles.buttonIcon} />
          <span className={styles.title}>
            {title || formatMessageApi({ Label_COM_Opus: 'confirmation' })}
          </span>
        </div>
      }
      visible={show}
      centered
      closable={false}
      onOk={() => {
        handleConfirm();
      }}
      onCancel={() => {
        handleCancle();
      }}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default Main;
