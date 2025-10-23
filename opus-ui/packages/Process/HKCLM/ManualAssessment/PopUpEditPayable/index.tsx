import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { Modal } from 'antd';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { NAMESPACE } from '../activity.config';
import List from './List';
import styles from './index.less';

const NewIndex = () => {
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
        width="100%"
        transitionName=""
        maskTransitionName=""
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

export default NewIndex;
