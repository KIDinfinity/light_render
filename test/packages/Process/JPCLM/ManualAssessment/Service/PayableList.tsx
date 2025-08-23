import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { getPayableList } from 'claim/pages/utils/selector';
import PayableItem from './PayableItem';
import PayableItemAdd from './PayableItemAdd';
import Add from './Add';

const ServicePayableList = ({ serviceItemId, incidentId, treatmentId, invoiceId }: any) => {
  const servicePayableAddItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.servicePayableAddItem
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const serviceItemPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.serviceItemPayableListMap
  );

  const isBelongToCurrentItem =
    servicePayableAddItem && serviceItemId === servicePayableAddItem.serviceItemId;
  const curServicePayableList = getPayableList(
    'serviceItemId',
    serviceItemId,
    serviceItemPayableListMap
  );

  return (
    <div>
      {curServicePayableList &&
        lodash.map(curServicePayableList, (item: any) => (
          <PayableItem
            key={item.id}
            serviceItemPayableId={item?.id}
            serviceItemId={serviceItemId}
            curServicePayableList={curServicePayableList}
          />
        ))}
      {servicePayableAddItem && isBelongToCurrentItem && (
        <PayableItemAdd
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          serviceItemPayableDetail={servicePayableAddItem}
          curServicePayableList={curServicePayableList}
        />
      )}
      {editable && (
        <Add
          incidentId={incidentId}
          treatmentId={treatmentId}
          serviceItemId={serviceItemId}
          invoiceId={invoiceId}
        />
      )}
    </div>
  );
};

export default ServicePayableList;
