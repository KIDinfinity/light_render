import React from 'react';
import lodash from 'lodash';
import { FormAntCard } from 'basic/components/Form';
import Basic from './Basic';
import ExpandTitle from './ExpandTitle';
import ExpandExtra from './ExpandExtra';
import DiagnosisList from '../Diagnosis/List';

const Expand = ({ incidentId, incidentItem, incidentItemExpandStatus }: any) => {
  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

  return (
    <FormAntCard
      title={<ExpandTitle incidentItem={incidentItem} />}
      bordered={false}
      extra={<ExpandExtra {...{ incidentItemExpandStatus, incidentId, hasTreatment }} />}
    >
      <Basic {...{ incidentItem, incidentId, incidentItemExpandStatus }} />
      <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
    </FormAntCard>
  );
};

export default Expand;
