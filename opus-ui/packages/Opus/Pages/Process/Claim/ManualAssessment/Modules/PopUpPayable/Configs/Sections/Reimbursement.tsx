import React from 'react';
import { useSelector } from 'dva';
import Section, { ReimbursementFields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Reimbursement">
      <ReimbursementFields.Chooise />
      <ReimbursementFields.TreatmentNo />
      <ReimbursementFields.Therapy />
      <ReimbursementFields.ServicePayableAmount />
    </Section>
  );
};
