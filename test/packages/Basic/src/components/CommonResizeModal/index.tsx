import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

import ResizeModal from '@/components/ResizeModal';
import ButtonGroup from './ButtonGroup';
import Header from './Header';
import { EButtonType } from './EButtonType';
import styles from './index.less';

export { EButtonType };

function CommonResizeModal({
  children,
  visible,
  className,
  contentStyles,
  loading,
  title,
  ...res
}: any) {
  return (
    <ResizeModal
      {...res}
      className={classNames(styles.commonResizeModal, className)}
      visible={visible}
      setVisible={res?.onCancel}
      hasTitle={!!title}
    >
      <div className={styles.container}>
        <ButtonGroup {...res} />
        <div className={styles.content} style={{ ...contentStyles }}>
          {title && <Header title={title} />}
          {visible && children}
        </div>
        <div
          className={classNames(styles.spinContainer, {
            [styles.loading]: loading,
          })}
        >
          <Spin />
        </div>
      </div>
    </ResizeModal>
  );
}

const Wrap = (props: any) => {
  const [wrapDom, setWrapDom] = useState(null);
  const visible = props.visible;
  useEffect(() => {
    if (visible) {
      const modalDiv = document.createElement('div');
      modalDiv.setAttribute('id', 'modalRoot');
      document.body.appendChild(modalDiv);
      setWrapDom(modalDiv);
      return () => {
        document.body.removeChild(modalDiv);
      };
    }
  }, [visible]);
  if (!wrapDom) return null;

  return ReactDOM.createPortal(<CommonResizeModal {...props} />, wrapDom);
};

export default Wrap;
