import React from 'react';
import { Treatment } from 'process/Components/BussinessControls';
import ButtonGroup from '../TreatmentPayable/ButtonGroup';
import ProcedureV2 from './ProcedureV2';
import InvoiceV2 from './InvoiceV2';
import ShrinkInvoiceList from '../Invoice/ShrinkList';
import SummaryTreatmentPayable from '../SummaryTreatmentPayable';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: any;
  incidentId: string;
}

const TreatmentV2 = (props: IProps) => {
  return (
    <Treatment.LYMA
      {...props}
      Procedure={ProcedureV2}
      ButtonGroup={ButtonGroup}
      Invoice={InvoiceV2}
      ShrinkInvoiceList={ShrinkInvoiceList}
      SummaryTreatmentPayable={SummaryTreatmentPayable}
    />
  );
};

export default TreatmentV2;
