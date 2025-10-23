import React from 'react';
import Diagnosis from 'process/Components/BussinessControls/Diagnosis';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: any;
  incidentId: string;
}
const DiagnosisV2 = (props: IProps) => {
  return <Diagnosis.LYMA {...props} />;
};
export default DiagnosisV2;
