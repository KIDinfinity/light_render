import React from 'react';
import { useSelector, useDispatch } from 'dva';
import PayableGroupLayout from './PayableGroupLayout';
import ItemBasicInfo from './ItemBasicInfo';
import PayableList from './PayableList';

const ProcedureItem = ({ incidentId, treatmentId, procedureId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  return (
    <PayableGroupLayout showButton={editable} handleClick={handleDelete} className="ProcedureItem">
      <PayableGroupLayout.Basic>
        <ItemBasicInfo
          incidentId={incidentId}
          treatmentId={treatmentId}
          procedureId={procedureId}
        />
      </PayableGroupLayout.Basic>
      <PayableGroupLayout.Payable>
        <PayableList incidentId={incidentId} treatmentId={treatmentId} procedureId={procedureId} />
      </PayableGroupLayout.Payable>
    </PayableGroupLayout>
  );
};

export default ProcedureItem;
