import React, { useState, useEffect } from 'react';
import { Modal, Spin } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ButtonGroup from './ButtonGroup';
import styles from './index.less';

interface IParams {
  show: boolean;
  setShow: Function;
  onConfirm: () => Promise<any>;
  onBack?: () => Promise<void>;
  onBeforeBack?: () => Promise<void>;
  children: any;
  width?: number | string;
  forceRender?: boolean;
  loading?: boolean;
  actionConfig?: any;
  visibility?: boolean;
  maskClosable?: boolean;
}

const Modals = ({
  show,
  setShow,
  children,
  onBack,
  width,
  loading = true,
  onBeforeBack,
  forceRender,
  actionConfig,
  visibility,
  maskClosable = false,
  ...res
}: IParams) => {
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const progressData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.progressData) || [];
  
  const modalShouldClose =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalShouldClose);
  

  const handleConfirmLoading = (state: boolean) => {
    dispatch({
      type: `${NAMESPACE}/saveConfirmLoading`,
      payload: {
        show: state,
      },
    });
    if (!loading) {
      return;
    }
    setConfirmLoading(state);
  };

  const onCancel = async () => {
    if (lodash.isFunction(onBeforeBack)) {
      await onBeforeBack();
    }
    setShow(false);
    if (lodash.isFunction(onBack)) {
      await onBack();
    }
  };

  useEffect(() => {
    if (show) {
      dispatch({
        type: `${NAMESPACE}/clearError`,
      });
    }
  }, [show]);
  useEffect(() => {
    if (!lodash.isEmpty(progressData) || modalShouldClose) {
      setShow(false);
    }
  }, [progressData, modalShouldClose]);

  return (
    <>
      <Modal
        width={width || '70%'}
        centered
        className={classNames(styles.modalWrap, { [styles.modalWrapHidden]: visibility })}
        visible={show}
        onCancel={onCancel}
        footer={null}
        mask={!visibility}
        maskClosable={maskClosable}
        forceRender={forceRender || false}
      >
        <div className={styles.wrap}>
          <div className={styles.leftWrap}>
            <ButtonGroup
              handleConfirmLoading={handleConfirmLoading}
              setShow={setShow}
              {...res}
              onCancel={onCancel}
              actionConfig={actionConfig}
            />
          </div>
          <div className={styles.content}>{show && children}</div>
        </div>
        {!!confirmLoading && lodash.isEmpty(progressData) && (
          <div className={styles.loadingWrap}>
            <div className={styles.loading}>
              <Spin size="large" />
            </div>
          </div>
        )}
      </Modal>

    </>
  );
};

export default Modals;
