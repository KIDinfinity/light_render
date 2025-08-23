import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Item from './Item';
import Add from './Add';
import ProcedureType from './ProcedureType';
import SearchList from './SearchList';
const AntiCancerProdureListItem = ({ treatmentId, otherProcedureId }: any) => {
  const antiCancerProcedure = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap?.[otherProcedureId]
  );
  return (
    <>
      <ProcedureType
        treatmentId={treatmentId}
        claimNo={antiCancerProcedure.claimNo}
        otherProcedureId={otherProcedureId}
        procedureType={antiCancerProcedure.procedureType}
      />
      {lodash.map(
        lodash.compact(antiCancerProcedure.therapeuticMonthList || []),
        (antiCancerProcedureItem: any,index: number) => {
          return (
            <Item
              otherProcedureId={otherProcedureId}
              antiCancerProcedureItem={antiCancerProcedureItem}
              key={antiCancerProcedureItem.therapeuticMonth}
              idx={index}
            />
          );
        }
      )}
      {!lodash.isEmpty(antiCancerProcedure.therapeuticMonthList)&&<SearchList
        otherProcedureId={otherProcedureId}
      />}
      <Add otherProcedureId={otherProcedureId} />
    </>
  );
};

export default AntiCancerProdureListItem;
