import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { getPayableList } from 'claim/pages/utils/selector';
import PayableItem from './PayableItem';
import PayableItemAdd from './PayableItemAdd';
import PayableAdd from './PayableAdd';

const ProcedurePayableList = ({ incidentId, treatmentId, procedureId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const procedurePayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.procedurePayableListMap
  );
  const procedurePayableItemAdd = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.procedurePayableItemAdd
  );

  const getProcedurePayableList = () => {
    return getPayableList('procedureId', procedureId, procedurePayableListMap);
  };
  const curProcedurePayableItemList = getProcedurePayableList();
  const isBelongToCurrentItem =
    procedurePayableItemAdd && procedureId === procedurePayableItemAdd.procedureId;
  return (
    <div>
      {lodash.map(curProcedurePayableItemList, (item: any) => (
        <PayableItem
          key={item.id}
          procedurePayableItem={item}
          curProcedurePayableItemList={curProcedurePayableItemList}
        />
      ))}
      {!lodash.isEmpty(procedurePayableItemAdd) && isBelongToCurrentItem && (
        <PayableItemAdd
          procedurePayableItemAdd={procedurePayableItemAdd}
          curProcedurePayableItemList={curProcedurePayableItemList}
        />
      )}
      {editable && (
        <PayableAdd incidentId={incidentId} procedureId={procedureId} treatmentId={treatmentId} />
      )}
    </div>
  );
};

export default ProcedurePayableList;
