import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import InvoiceListItem from './InvoiceListItem';

@connect(({ bpOfClaimAssessmentController }: any, { treatmentId }: any) => ({
  invoiceList:
    bpOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].invoiceList,
}))
class InvoiceList extends PureComponent {
  render() {
    const { invoiceList, incidentId, treatmentId }: any = this.props;

    return (
      <div>
        {lodash.isArray(invoiceList) &&
          lodash.map(invoiceList, (item, index) => (
            <InvoiceListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item}
              key={item}
            />
          ))}
      </div>
    );
  }
}

export default InvoiceList;
