import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import moment from 'moment';
import {
  calculatPayableAmountInvoiceLevel,
  calculatPayableProportionInvoiceLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryCurrencyPayableAmount from 'claim/components/SummaryCurrencyPayableAmount';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import ServiceList from '../ServiceItem/ServiceList';
import InvoicePayableList from './InvoicePayableList';

const mapStateToProps = ({ bpOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const { claimEntities } = bpOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountInvoiceLevel(claimEntities, invoiceId);
  const percentValue = calculatPayableProportionInvoiceLevel(claimEntities, invoiceId);
  const invoiceItem = lodash.get(
    bpOfClaimAssessmentController,
    `claimEntities.invoiceListMap.${invoiceId}`
  );
  return {
    totalPayableAmount,
    percentValue,
    invoiceNo: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceNo')),
    expense: formUtils.queryValue(lodash.get(invoiceItem, 'expense')),
    invoiceDate: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceDate')),
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
      totalPayableAmount,
      percentValue,
      expense,
    }: any = this.props;

    const summaryParams = {
      totalPayableAmount,
      totalExpense: expense,
      percentValue,
    };

    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
        })}${invoiceNo}`}
        bordered={false}
        extra={<span>{moment(invoiceDate).format('L')}</span>}
      >
        <SummaryCurrencyPayableAmount params={summaryParams} hiddenPrefix />
        <InvoicePayableList
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
        />
        <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={invoiceId} />
      </Card>
    );
  }
}

export default InvoiceListItem;
