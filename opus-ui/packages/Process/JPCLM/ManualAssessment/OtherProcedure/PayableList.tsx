import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { getPayableList } from 'claim/pages/utils/selector';
import PayableItem from './PayableItem';
import PayableItemAdd from './PayableItemAdd';
import PayableAdd from './PayableAdd';

const PayableList = ({
  otherProcedureId,
  incidentId,
  treatmentId,
  otherProcedurePayableListMap,
  taskNotEditable,
  otherProcedurePayableItemAdd,
}: any) => {
  const getOtherProcedurePayableList = () => {
    return getPayableList('otherProcedureId', otherProcedureId, otherProcedurePayableListMap);
  };

  const curOtherProcedurePayableItemList = getOtherProcedurePayableList();

  const isBelongToCurrentItem =
    otherProcedurePayableItemAdd &&
    otherProcedureId === otherProcedurePayableItemAdd.otherProcedureId;
  return (
    <div>
      {lodash.map(curOtherProcedurePayableItemList, (item: any) => (
        <div>
          <PayableItem
            key={item?.id}
            id={item.id}
            otherProcedurePayableItem={item}
            curOtherProcedurePayableItemList={curOtherProcedurePayableItemList}
            treatmentId={treatmentId}
            otherProcedureId={otherProcedureId}
            isAdd={false}
          />
        </div>
      ))}
      {!lodash.isEmpty(otherProcedurePayableItemAdd) && isBelongToCurrentItem && (
        <PayableItemAdd
          otherProcedurePayableItemAdd={otherProcedurePayableItemAdd}
          curOtherProcedurePayableItemList={curOtherProcedurePayableItemList}
          treatmentId={treatmentId}
          isAdd
        />
      )}
      {!taskNotEditable && (
        <PayableAdd
          incidentId={incidentId}
          otherProcedureId={otherProcedureId}
          treatmentId={treatmentId}
        />
      )}
    </div>
  );
};

export default connect(({ JPCLMOfClaimAssessment, claimEditable }: any) => ({
  otherProcedurePayableListMap: JPCLMOfClaimAssessment?.claimEntities?.otherProcedurePayableListMap,
  taskNotEditable: claimEditable.taskNotEditable,
  otherProcedurePayableItemAdd: JPCLMOfClaimAssessment?.otherProcedurePayableItemAdd,
}))(PayableList);
