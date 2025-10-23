import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import ProductList from './ProductList';
import styles from './index.less';
import lodash from 'lodash';
import useGetProductList from '../../_hooks/useGetProductList';
import { formUtils } from 'basic/components/Form';

const AdjustmentFactor = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { visible, left, top } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.adjustmentFactorState?.[incidentId]
    ) || {};

  const productList = useGetProductList({ incidentId });
  const onCloseFactor = () => {
    dispatch({
      type: `${NAMESPACE}/setAdjustmentFactorState`,
      payload: {
        visible: false,
        incidentId,
      },
    });
  };
  const handleReAssessment = async () => {
    // TODO：这里也许用回调到这里去掉用effer更好(promise)
    dispatch({
      type: `${NAMESPACE}/packAdjustmentFactorForSubmit`,
    });
    onCloseFactor();
    dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: NAMESPACE,
      },
    });
  };

  const onReturn = () => {
    const hasOriginData = lodash
      .chain(productList)
      .some((item) => {
        return lodash.some(item?.factorList, (ite) => {
          return (
            (ite?.originData !== undefined &&
              ite?.originData !== formUtils.queryValue(ite?.isSelected)) ||
            (ite?.list[0]?.originFactorValue !== undefined &&
              ite?.list[0]?.originFactorValue !== formUtils.queryValue(ite?.list[0]?.factorValue))
          );
        });
      })
      .value();
    return hasOriginData ? handleReAssessment() : onCloseFactor();
  };
  return (
    <CommonResizeModal
      iconVisible={false}
      visible={visible}
      className={styles.PopUpPayable}
      onReturn={onReturn}
      onCancel={onCloseFactor}
      returnAuth
      width={820}
      moveTop={top + 32}
      moveLeft={left - 820}
      authHeight
    >
      <ProductList incidentId={incidentId} productList={productList} />
    </CommonResizeModal>
  );
};

export default AdjustmentFactor;
