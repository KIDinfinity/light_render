import React, { useMemo } from 'react';
import { Icon, Button } from 'antd';
import classnames from 'classnames';
import { v4 as uuid } from 'uuid';
import Location from './location';
import Border from './Border';
import Container from './Container';
import LocationType from './LocationType';
import styles from './index.less';

const ResizeModal = (props: any) => {
  const id = uuid();
  let location: any = new Location({
    id,
    ...props,
  });

  return ({ children, visible, setVisible, className, hasTitle ,iconVisible=true}: any) => {
    const onCancel = () => {
      setVisible(false);
      location = null;
    };

    return (
      <div
        className={classnames(className, {
          [styles.disable]: !visible,
        })}
      >
        <Container location={location} id={id} hasTitle={hasTitle}>
          <Border location={location} type={LocationType.left} />
          <div className={classnames(styles.modal)}>
            <Border location={location} type={LocationType.top} />
            {iconVisible && <Button className={styles.close} onClick={onCancel}>
              <Icon type="close" />
            </Button>}
            <div className={classnames(styles.modalBody, 'resizeModalBody')}>{children}</div>
            <Border location={location} type={LocationType.bottom} />
          </div>
          <Border location={location} type={LocationType.right} />
        </Container>
      </div>
    );
  };
};

export default (props: any) => {
  const { visible, ...res } = props;
  const Modal = useMemo(() => ResizeModal({ ...res }), [visible]);

  return <Modal {...props} />;
};
