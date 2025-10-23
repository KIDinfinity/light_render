import React from 'react'
import { useSelector } from 'dva';
import Section, { OtherProcedureMultipleFields as Fields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.OtherProcedureMultiple">
      <Fields.Chooise ProcedureId={data.id} />
      <Fields.ProcedureCode procedureId={data?.procedureId} />
      <Fields.payableAmount data={data} />
      <Fields.PayableDays />
      <Fields.DateOfConsultation />
    </Section>
  )
}
