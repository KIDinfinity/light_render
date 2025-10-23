import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ListItem from './ListItem';

const List = () => {
  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );
  return (
    <div>
      {lodash.isArray(incidentList) &&
        incidentList.length > 0 &&
        incidentList.map((item, index) => (
          <ListItem key={item} total={incidentList.length} index={index} incidentId={item} />
        ))}
    </div>
  );
};

export default List;
