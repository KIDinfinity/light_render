import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import InvoiceListItem from './InvoiceListItem';

@connect(({ hbOfClaimAssessmentController, formCommonController }, { treatmentId }) => ({
  invoiceList:
    hbOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].invoiceList,
  submited: formCommonController.submited,
}))
class InvoiceList extends Component {
  render() {
    const { invoiceList, incidentId, treatmentId, submited } = this.props;
    return (
      <div>
        {submited && lodash.isArray(invoiceList) && invoiceList.length === 0 && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000051' })}
          />
        )}
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
