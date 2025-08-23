import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ServiceList from '../ServiceItem/ServiceList';
import InvoicePayableList from './InvoicePayableList';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import {
  calculatPayableAmountInvoiceLevel,
  calculatPayableProportionInvoiceLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import { subtract } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const { claimEntities } = hbOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountInvoiceLevel(claimEntities, invoiceId);
  const percentValue = calculatPayableProportionInvoiceLevel(claimEntities, invoiceId);
  return {
    totalPayableAmount,
    percentValue,
    invoiceItem: hbOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId],
  };
};

@connect(mapStateToProps)
class InvoiceListItem extends Component {
  render() {
    const {
      incidentId,
      treatmentId,
      invoiceId,
      invoiceItem,
      totalPayableAmount,
      percentValue,
    }: any = this.props;

    const params = {
      totalPayableAmount,
      percentValue,
      uncoverAmount: subtract(formUtils.queryValue(invoiceItem.expense), totalPayableAmount),
    };
    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
        })}${invoiceItem.invoiceNo}`}
        bordered={false}
        extra={<span>{moment(invoiceItem.invoiceDate).format('L')}</span>}
      >
        <SummaryPayableAmount params={params} />
        <InvoicePayableList
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
        />
        <InvoiceListItemOfBasicInfo invoiceItem={invoiceItem} />
        <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={invoiceId} />
      </Card>
    );
  }
}

export default InvoiceListItem;
