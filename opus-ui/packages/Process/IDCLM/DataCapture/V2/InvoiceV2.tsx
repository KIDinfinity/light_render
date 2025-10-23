import React from 'react';
import { Invoice } from 'process/Components/BussinessControls';
import ServiceV2 from './ServiceV2';
import PopUpInvoice from '../InvoicePop';

const InvoiceV2 = (props: any) => {
  return <Invoice.LYDC {...props} Service={ServiceV2} PopUpInvoice={PopUpInvoice} />;
};

export default InvoiceV2;
