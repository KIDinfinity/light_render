import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import Item from './ListItem';
import Add from './Add';
import style from './List.less';

export default function List({ serviceItemId, treatmentId, invoiceId, incidentId }: any) {
  const feeItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.serviceItemListMap[serviceItemId]?.feeItemList
  );
  return (
    <div className={style.feesList}>
      {lodash.map(feeItemList, (item) => (
        <Item
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          serviceItemId={serviceItemId}
          feeItemId={item}
          key={item}
          incidentId={incidentId}
        />
      ))}
      <Add
        treatmentId={treatmentId}
        invoiceId={invoiceId}
        serviceItemId={serviceItemId}
        incidentId={incidentId}
      />
    </div>
  );
}
