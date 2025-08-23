import React from 'react';
import { useSelector } from 'dva';
import Section, { TreamentFields as Fields } from '../../Section';

export default ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Treament">
      <Fields.PolicyYear />
      <Fields.TreamentPayableAmount />
      <Fields.TreamentPayableDays />
      <Fields.DateOfAdmission />
      <Fields.DateOfDischarge />
    </Section>
  );
};
