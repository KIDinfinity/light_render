import React from 'react';
import { useSelector } from 'dva';
import Section, { ProcedureFields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Procedure">
      <ProcedureFields.Chooise />
      <ProcedureFields.ProcedureCode procedureId={data.procedureId} />
      <ProcedureFields.OperationDate />
      <ProcedureFields.payableAmount />
    </Section>
  );
};
