import React from 'react';
import { useSelector } from 'dva';
import Section, { ServiceFields } from '../../Section';
import { NAMESPACE } from '../../../activity.config';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { incidentId } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.basic) || {};
  return (
    <Section form={form} editable={editable} section="PopUpPayable.Service">
      <ServiceFields.Chooise />
      <ServiceFields.InvoiceNo />
      <ServiceFields.ServiceItem
        incidentId={incidentId}
        serviceItemId={data.id}
        invoiceId={data.invoiceId}
      />
      <ServiceFields.ServicePayableAmount />
      <ServiceFields.ServicePayableDays />
      <ServiceFields.BoosterPayableAmount boosterNotEdible={data.boosterNotEdible} />
      <ServiceFields.BoosterPayableDays boosterNotEdible={data.boosterNotEdible} />
    </Section>
  );
};
