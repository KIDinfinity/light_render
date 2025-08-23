import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Incident, NamespaceType } from 'process/Components/BussinessControls';
import DiagnosisV2 from './DiagnosisV2';
import TreatmentV2 from './TreatmentV2';
import ButtonGroup from '../ButtonGroup';
import SummaryPayable from '../SummaryPayable';
import LabelSection from '../SummaryPayable/LabelSection';

const IncidentV2 = () => {
  return (
    <Incident.LYMA
      NAMESPACE={NAMESPACE}
      namespaceType={NamespaceType.Assessment}
      Diagnosis={DiagnosisV2}
      Treatment={TreatmentV2}
      ButtonGroup={ButtonGroup}
      SummaryPayable={SummaryPayable}
      LabelSection={LabelSection}
    />
  );
};

export default IncidentV2;
