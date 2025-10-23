import React from 'react';
import { useSelector } from 'dva';
import Section, { OtherProcedureFields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.OtherProcedure">
      <OtherProcedureFields.Chooise />
      <OtherProcedureFields.ProcedureCode procedureId={data.procedureId} />
      <OtherProcedureFields.payableAmount />
      <OtherProcedureFields.PayableDays />
      <OtherProcedureFields.DateOfConsultation />
    </Section>
  );
};
