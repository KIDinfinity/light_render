import React from 'react';
import { useSelector } from 'dva';
import Section, { TreatmentOPFields } from '../../Section';

export default ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.TreamentOP">
      <TreatmentOPFields.Chooise />
      <TreatmentOPFields.TreatmentNo />
      <TreatmentOPFields.TreatmentDate />
      <TreatmentOPFields.TreatmentPayableDays />
      <TreatmentOPFields.TreatmentPayableAmount />
    </Section>
  );
};
