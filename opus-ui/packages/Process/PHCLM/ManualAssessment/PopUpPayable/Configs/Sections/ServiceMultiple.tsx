import React from 'react';
import { useSelector } from 'dva';
import Section, { ServiceMultipleFields as Fields } from '../../Section';
import { NAMESPACE } from '../../../activity.config';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { incidentId } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.basic) || {};
  const { id, serviceItemId, invoiceId, boosterNotEdible } = data;

  return (
    <Section form={form} editable={editable} section="PopUpPayable.ServiceMultiple">
      <Fields.Chooise />
      <Fields.ServicePayableAmount />
      {/* <Fields.ServicePayableDays /> */}
      {/* <Fields.BoosterPayableAmount boosterNotEdible={boosterNotEdible} /> */}
      {/* <Fields.BoosterPayableDays boosterNotEdible={boosterNotEdible} /> */}
      <Fields.InvoiceNo />
      <Fields.ServiceItem
        incidentId={incidentId}
        serviceItemId={serviceItemId}
        invoiceId={invoiceId}
      />
    </Section>
  );
};
