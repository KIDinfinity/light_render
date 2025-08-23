import React from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { FormCard } from 'basic/components/Form';
import Item from './Item';
import Add from './Add';
import ProcedureType from './ProcedureType';
import SearchList from './SearchList';
const AntiCancerProdureListItem = ({ treatmentId, otherProcedureItem }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { id: otherProcedureId, therapeuticMonthList } = otherProcedureItem || {};

  const deleteAntiCancerProcedure = () => () => {
    dispatch({
      type: 'JPCLMOfDataCapture/otherProcedureDelete',
      payload: {
        treatmentId,
        otherProcedureId,
      },
    });
  };

  return (
    <FormCard
      className="antiCancerProcedure"
      showButton={!!editable}
      handleClick={deleteAntiCancerProcedure()}
    >
      <ProcedureType
        treatmentId={treatmentId}
        claimNo={otherProcedureItem.claimNo}
        otherProcedureId={otherProcedureId}
        procedureType={otherProcedureItem.procedureType}
      />
      {lodash.map(therapeuticMonthList, (therapeuticMonthItem: any, index: number) => {
        return (
          <Item
            otherProcedureId={otherProcedureId}
            antiCancerProcedureItem={therapeuticMonthItem}
            key={therapeuticMonthItem.therapeuticMonth}
            idx={index}
          />
        );
      })}
      {!lodash.isEmpty(therapeuticMonthList) && <SearchList otherProcedureId={otherProcedureId} />}
      <Add otherProcedureId={otherProcedureId} />
    </FormCard>
  );
};

export default AntiCancerProdureListItem;
