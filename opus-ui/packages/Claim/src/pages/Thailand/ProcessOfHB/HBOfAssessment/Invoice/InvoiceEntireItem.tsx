import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Col, Row } from 'antd';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { subtract } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import {
  calculatPayableAmountInvoiceLevel,
  calculatPayableProportionInvoiceLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import ServiceList from '../ServiceItem/ServiceList';
import InvoiceEntirePayableList from './InvoiceEntirePayableList';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import type { IInvoice } from '@/dtos/claim';
import styles from './InvoiceEntireItem.less';

interface IProps {
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  invoiceItem: IInvoice;
  totalPayableAmount: number;
  percentValue: number;
}

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const totalPayableAmount = calculatPayableAmountInvoiceLevel(
    hbOfClaimAssessmentController.claimEntities,
    invoiceId
  );
  const percentValue = calculatPayableProportionInvoiceLevel(
    hbOfClaimAssessmentController.claimEntities,
    invoiceId
  );
  return {
    totalPayableAmount,
    percentValue,
    invoiceItem: hbOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId],
  };
};

@connect(mapStateToProps)
class InvoiceEntireItem extends PureComponent<IProps> {
  render() {
    const {
      incidentId,
      treatmentId,
      invoiceId,
      invoiceItem,
      totalPayableAmount,
      percentValue,
    } = this.props;
    const totalExpense = formUtils.queryValue(invoiceItem.expense);
    const params = {
      totalPayableAmount,
      uncoverAmount: subtract(totalExpense, totalPayableAmount),
      percentValue,
    };

    return (
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <div className={styles.invoice_entire_scroll}>
            <Card
              className={styles.invoice_entire_card}
              title={`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
              })}${invoiceItem.invoiceNo}`}
              bordered={false}
              extra={<span>{moment(invoiceItem.invoiceDate).format('L')}</span>}
            >
              <SummaryPayableAmount params={params} hasTreatment="" />
              <InvoiceListItemOfBasicInfo invoiceItem={invoiceItem} />
              <ServiceList
                incidentId={incidentId}
                treatmentId={treatmentId}
                invoiceId={invoiceId}
              />
            </Card>
          </div>
        </Col>
        <Col span={16}>
          <div className={styles.invoice_entire_scroll}>
            <Card
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.claim.label.invoice-payable-detail',
              })}
              bordered={false}
              className={styles.invoice_entire_card}
            >
              <InvoiceEntirePayableList
                incidentId={incidentId}
                treatmentId={treatmentId}
                invoiceId={invoiceId}
              />
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default InvoiceEntireItem;
