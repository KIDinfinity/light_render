import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { EProcedureType } from 'process/Enum';
import PayableGroupLayout from '../Procedure/PayableGroupLayout';
import ItemBasicInfo from './ItemBasicInfo';
import PayableList from './PayableList';
import AntiCancerProcedureList from '../AntiCancerProcedure/List';

const OtherProcedureListItem = ({ incidentId, treatmentId, otherProcedureId }: any) => {
  const dispatch = useDispatch();

  const otherProcedure = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap[otherProcedureId]
  );

  const procedureType = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.otherProcedureListMap?.[otherProcedureId]
        ?.procedureType
  );

  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) &&
    procedureType === EProcedureType.Radiotherapy;

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/otherProcedureDelete',
      payload: {
        treatmentId,
        otherProcedureId,
      },
    });
  };

  return (
    <>
      <PayableGroupLayout
        showButton={editable}
        handleClick={handleDelete}
        className="OtherProcedureItem"
      >
        <PayableGroupLayout.Basic>
          {otherProcedure.procedureType === EProcedureType.DG1 ? (
            <AntiCancerProcedureList
              treatmentId={treatmentId}
              otherProcedureId={otherProcedureId}
            />
          ) : (
            <ItemBasicInfo
              incidentId={incidentId}
              treatmentId={treatmentId}
              otherProducerId={otherProcedureId}
            />
          )}
        </PayableGroupLayout.Basic>
        <PayableGroupLayout.Payable>
          <PayableList
            incidentId={incidentId}
            treatmentId={treatmentId}
            otherProcedureId={otherProcedureId}
          />
        </PayableGroupLayout.Payable>
      </PayableGroupLayout>
    </>
  );
};

export default OtherProcedureListItem;
