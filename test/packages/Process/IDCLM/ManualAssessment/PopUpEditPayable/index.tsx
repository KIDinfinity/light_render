import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { NAMESPACE } from '../activity.config';
import List from './List';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const { isShowExpanderButton } = useExpanderController();
  const showPopUpEditPayable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.showPopUpEditPayable
  );
  const popUpPablePoint = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.popUpPablePoint || {}
  );
  const top = Number(popUpPablePoint?.top) - 10;

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/savePopUpEditPayable`,
      payload: {
        item: {},
      },
    });
  };

  return (
    <div className={styles.newIndex}>
      <Modal
        className={classNames(styles.editPop, isShowExpanderButton && styles.editPopOpen)}
        visible={showPopUpEditPayable}
        closeIcon={null}
        footer={null}
        transitionName=""
        maskTransitionName=""
        width="100%"
        style={{
          top,
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <List />
      </Modal>
    </div>
  );
};
