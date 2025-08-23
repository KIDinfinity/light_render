import React from 'react';
import ClaimPayableList from './Payable/List';
import Basic from './Basic';
import DiagnosisList from '../Diagnosis/List';
import { FormAntCard } from 'basic/components/Form';
import { useSelector } from 'dva';
import { SectionTitle } from './Section';
import ExpandExtra from './ExpandExtra';

const IncidentItem = ({ incidentId, hasTreatment }: any) => {
  const incidentNo = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]?.incidentNo
  );
  return (
    <FormAntCard
      title={<SectionTitle suffix={` No. ${incidentNo}`} />}
      bordered={false}
      extra={<ExpandExtra {...{ incidentId }} />}
    >
      <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
      <Basic incidentId={incidentId} hasTreatment={hasTreatment} />
      {/**
          //@ts-ignore */}
      <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
    </FormAntCard>
  );
};

export default IncidentItem;
