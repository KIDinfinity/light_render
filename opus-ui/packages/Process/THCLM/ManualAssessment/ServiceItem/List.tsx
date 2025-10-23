import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ServiceItem from './Item';
import Add from './Add';
import style from './ServiceList.less';

const ServiceList = ({ invoiceId, incidentId, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.invoiceListMap?.[invoiceId]?.serviceItemList
  );

  return (
    <div className={style.serviceList}>
      {lodash.map(data, item => (
        <ServiceItem
          key={item}
          serviceItemId={item}
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
        />
      ))}
      {!!editable &&
        <Add
          incidentId={incidentId}
          invoiceId={invoiceId}
        />}
    </div>
  );
};

export default ServiceList;
