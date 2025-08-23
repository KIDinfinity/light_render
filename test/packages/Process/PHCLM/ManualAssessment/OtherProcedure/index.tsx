import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import OtherProcedureItem from './Item';

export default ({ treatmentId, procedureExpand }: any) => {
  const otherProcedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId].otherProcedureList
  );

  return (
    <>
      {lodash.map(otherProcedureList, (item) => (
        <OtherProcedureItem
          otherProcedureId={item}
          key={item}
          treatmentId={treatmentId}
          procedureExpand={procedureExpand}
        />
      ))}
    </>
  );
};
