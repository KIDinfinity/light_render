import React from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector, useDispatch } from 'dva';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard } from 'basic/components/Form';
import ServiceItemPayable from 'process/Components/BussinessControls/ServiceItemPayable';
import styles from './index.less';

const ServicePayableItemV2 = ({
  serviceItemPayableId,
  invoicePayableId,
  item,
  booster,
  hasBooster,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const policyNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[serviceItemPayableId]?.policyNo
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeServicePayableItem`,
      payload: {
        invoicePayableItemId: invoicePayableId,
        serviceItemPayableItemId: serviceItemPayableId,
      },
    });
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      className={isAdjustMent && styles.isAdjustment}
      type="weight"
      borderColor={policyBackgrounds?.[policyNo]}
    >
      <ServiceItemPayable.SectionBasic
        NAMESPACE={NAMESPACE}
        id={serviceItemPayableId}
        booster={booster}
        hasBooster={hasBooster}
      />
    </FormBorderCard>
  );
};

export default ServicePayableItemV2;
