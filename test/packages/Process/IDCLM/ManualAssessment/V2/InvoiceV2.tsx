import React from 'react';
import { Invoice } from 'process/Components/BussinessControls';
import ServiceV2 from './ServiceV2';

const InvoiceV2 = (props: any) => {
  return <Invoice.LYMA {...props} Service={ServiceV2} />;
};

export default InvoiceV2;
