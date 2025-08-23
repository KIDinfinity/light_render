import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import { SectionTitle } from './Section';

const Title = ({ incidentId }: any) => {
  const incidentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.incidentNo
  );

  return <SectionTitle suffix={` No. ${incidentNo}`} />;
};

export default Title;
