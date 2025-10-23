import React from 'react';
import { Modal } from 'packages/Opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SuccessIcon from '@/assets/SuccessIcon.svg';
import styles from './index.less';
import classnames from 'classnames';
import { Button } from 'antd';

const Main = ({
  show,
  title,
  hiddenIcon = false,
  handleCancle,
  handleClose,
  children,
  className,
  ...rest
}: any) => {
  return (
    <Modal
      className={classnames(styles.modalWrap, className)}
      title={
        <div className={styles.titleWrap}>
          {!hiddenIcon && <img src={SuccessIcon} style={{ paddingRight: '8px' }} />}
          <span className={styles.title}>
            {title || formatMessageApi({ Label_COM_Opus: 'Success' })}
          </span>
        </div>
      }
      visible={show}
      closable={false}
      centered
      onCancel={() => {
        handleCancle();
      }}
      footer={[
        <Button key="submit" type="primary" onClick={handleClose}>
          {formatMessageApi({ Label_BPM_Button: 'Close' })}
        </Button>,
      ]}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default Main;
