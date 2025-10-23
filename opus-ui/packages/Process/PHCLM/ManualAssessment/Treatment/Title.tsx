import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import { SectionTitle } from './Section';

const Title = ({ treatmentId }: any) => {
  const treatmentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]?.treatmentNo
  );

  return <SectionTitle suffix={` No. ${treatmentNo}`} />;
};

export default Title;
