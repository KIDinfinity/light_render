import React from 'react';
import { useSelector } from 'dva';
import Section, { OtherProcedureFields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.OtherProcedure">
      <OtherProcedureFields.PolicyYear />
      <OtherProcedureFields.payableAmount data={data} />
      <OtherProcedureFields.PayableDays />
    </Section>
  );
};
