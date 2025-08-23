import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { validateServiceItem } from 'claimBasicProduct/pages/validators';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ServiceList from '../ServiceItem/ServiceList';
import InvoiceSummaryCurrencyPayableAmount from './InvoiceSummary';

const mapStateToProps = (
  { HKCLMOfClaimAssessmentController, formCommonController }: any,
  { invoiceId, treatmentId }: any
) => {
  const invoiceItem = lodash.get(
    HKCLMOfClaimAssessmentController,
    `claimEntities.invoiceListMap.${invoiceId}`
  );
  return {
    invoiceNo: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceNo')),
    invoiceDate: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceDate')),
    submited: formCommonController.submited,
    procedureList:
      HKCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].procedureList,
    invoiceListMap: HKCLMOfClaimAssessmentController.claimEntities.invoiceListMap,
    serviceItemListMap: HKCLMOfClaimAssessmentController.claimEntities.serviceItemListMap,
  };
};

@connect(mapStateToProps)
class InvoiceListItem extends PureComponent {
  render() {
    const {
      incidentId,
      treatmentId,
      invoiceId,
      invoiceDate,
      invoiceNo,
      submited,
      procedureList,
      invoiceListMap,
      serviceItemListMap,
    }: any = this.props;
    const isEqual = validateServiceItem({
      treatmentId,
      serviceItemListMap,
      invoiceListMap,
      procedureList,
    });
    return (
      <Card
        title={
          <>
            {`${formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-date',
            })}.${moment(invoiceDate).format('L')}`}
            {submited && !isEqual && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000475' })}
              />
            )}
          </>
        }
        bordered={false}
        extra={<span>{invoiceNo}</span>}
      >
        <InvoiceSummaryCurrencyPayableAmount invoiceId={invoiceId} />
        <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={invoiceId} />
      </Card>
    );
  }
}

export default InvoiceListItem;
