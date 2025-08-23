import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Incident, NamespaceType } from 'process/Components/BussinessControls';
import DiagnosisV2 from './DiagnosisV2';
import TreatmentV2 from './TreatmentV2';
import PopUpInvoice from '../InvoicePop';

const IncidentV2 = () => {
  return (
    <Incident.LYDC
      NAMESPACE={NAMESPACE}
      namespaceType={NamespaceType.DataCapture}
      Diagnosis={DiagnosisV2}
      Treatment={TreatmentV2}
      PopUpInvoice={PopUpInvoice}
     />
  );
};
export default IncidentV2;
