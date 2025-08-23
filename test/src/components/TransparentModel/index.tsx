import type { ReactNode } from 'react';
import React from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import type { ModalProps } from 'antd/es/modal';
import styles from './styles.less';

export interface ITransparentModal extends ModalProps {
  children?: ReactNode;
}

export default function ({ children, ...res }: ITransparentModal) {
  return (
    <Modal
      wrapClassName={classNames(styles.transparentModal, 'transparentModalMark')}
      closable={false}
      footer={null}
      zIndex={9999.9}
      {...res}
    >
      {children}
    </Modal>
  );
}
