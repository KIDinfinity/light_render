import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Item from './Item';

const List = () => {
  const incidentList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimProcessData?.incidentList
  );

  return (
    <div>
      {lodash.isArray(incidentList) &&
        incidentList.length > 0 &&
        lodash.map(incidentList, (item) => (
          <Item key={item} total={incidentList.length} incidentId={item} />
        ))}
    </div>
  );
};

export default List;
