import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import ListItem from './IncidentItem';

const List = () => {
  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  return (
    <div>
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
        })}
      />
      {lodash.isArray(incidentList) &&
        incidentList.length > 0?
        incidentList.map((item, index) => (
          <ListItem key={item} total={incidentList.length} index={index} incidentId={item} />
        )) :
        claimEntities? <ListItem key={'empty'} index={0} incidentId={''} /> : null
      }
    </div>
  );
};

export default List;
