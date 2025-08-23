import React from 'react'
import { useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import Section, { ProcedureMultipleFields as Fields } from '../../Section';

export default ({ form, data }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { incidentId } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.basic) || {};
  const { procedureId, treatmentId } = data;
  return (
    <Section form={form} editable={editable} section="PopUpPayable.ProcedureMultiple">
      <Fields.Chooise ProcedureId={data.id} />
      <Fields.ProcedureCode procedureId={procedureId} />
      <Fields.OperationDate treatmentId={treatmentId} incidentId={incidentId} />
      <Fields.payableAmount data={data} />
    </Section>
  )
}
