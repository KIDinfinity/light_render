import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import ProductList from './ProductList';

import styles from './index.less';

const AdjustmentFactor = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { visible, left, top } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.adjustmentFactorState?.[incidentId]
    ) || {};

  const onCloseFactor = () => {
    dispatch({
      type: `${NAMESPACE}/setAdjustmentFactorState`,
      payload: {
        visible: false,
        incidentId,
      },
    });
  };

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={visible}
      className={styles.PopUpPayable}
      onReturn={onCloseFactor}
      onCancel={onCloseFactor}
      onConfirm={onCloseFactor}
      returnAuth
      width={820}
      moveTop={top + 32}
      moveLeft={left - 820}
      authHeight
    >
      <ProductList incidentId={incidentId} />
    </CommonResizeModal>
  );
};

export default AdjustmentFactor;
