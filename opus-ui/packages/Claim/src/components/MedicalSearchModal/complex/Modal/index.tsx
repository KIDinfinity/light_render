import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { Icon, Button } from 'antd';
import { LS, LSKey } from '@/utils/cache';
import styles from './index.less';
import ModalLocationUtils from './modalLocation';

const modalLocationUtils = new ModalLocationUtils(
  LS.getItem(LSKey.TBLSEARCH_LOCATION) || {
    left: '30vw',
    right: '30vw',
    top: '10vh',
    moveX: 0,
    moveY: 0,
    xSignLeft: '',
    xSignRight: '',
    ySignTop: '',
    ySignBottom: '',
  }
);
const initStyle = lodash.pick(LS.getItem(LSKey.TBLSEARCH_LOCATION), ['left', 'right', 'top']);
interface ModalProps {
  children: any;
  visible: boolean;
  onCancel?: Function;
}
function Modal(props: ModalProps) {
  const { children, visible, onCancel } = props;
  return (
    <div
      className={classnames(styles.dialog, {
        [styles.hidden]: !visible,
      })}
      onMouseUp={(e) => {
        modalLocationUtils.handleMouseUp(e);
      }}
      onMouseDown={modalLocationUtils.handleStartMove}
      id="tblSearhModal"
      style={initStyle}
    >
      <div
        className={classnames(styles.colResize, styles.colResizeLeft)}
        onMouseDown={(e) => {
          modalLocationUtils.handleStartResize(e, 'left');
        }}
        onMouseUp={(e) => {
          modalLocationUtils.handleEndResize(e);
        }}
      />
      <div className={classnames(styles.modal)}>
        <Button type="button" className={styles.close} onClick={onCancel}>
          <Icon type="close" />
        </Button>
        <div className={classnames(styles.modalBody, styles['black-scroll'])}>{children}</div>
      </div>
      <div
        className={classnames(styles.colResize, styles.colResizeRight)}
        onMouseDown={(e) => {
          modalLocationUtils.handleStartResize(e, 'right');
        }}
        onMouseUp={(e) => {
          modalLocationUtils.handleEndResize(e);
        }}
      />
    </div>
  );
}

export default React.memo(Modal);
