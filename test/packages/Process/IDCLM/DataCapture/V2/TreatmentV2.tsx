import React from 'react';
import { Treatment } from 'process/Components/BussinessControls';
import ProcedureV2 from './ProcedureV2';
import InvoiceV2 from './InvoiceV2';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: any;
  incidentId: string;
}
const TreatmentV2 = (props: IProps) => {
  return <Treatment.LYDC {...props} Procedure={ProcedureV2} Invoice={InvoiceV2} />;
};
export default TreatmentV2;
