import React from 'react';
import { useSelector } from 'dva';
import Section, { TreamentFields } from '../../Section';

export default ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Treament">
      <TreamentFields.Chooise />
      <TreamentFields.TreamentPayableAmount />
      <TreamentFields.TreamentPayableDays />
      <TreamentFields.TreatmentNo />
    </Section>
  );
};
