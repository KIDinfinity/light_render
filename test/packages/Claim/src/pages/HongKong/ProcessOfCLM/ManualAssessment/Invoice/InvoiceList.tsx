import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import InvoiceListItem from './InvoiceListItem';
import InvoiceCurrencyModal from '../InvoiceCurrencyModal';
import ExchangeDateModal from '../ExchangeDateModal';

@connect(({ HKCLMOfClaimAssessmentController }: any, { treatmentId }: any) => ({
  invoiceList:
    HKCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].invoiceList,
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
        <InvoiceCurrencyModal />
        <ExchangeDateModal />
      </div>
    );
  }
}

export default InvoiceList;
