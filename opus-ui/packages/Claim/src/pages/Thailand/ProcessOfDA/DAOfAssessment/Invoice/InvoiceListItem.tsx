import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
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
import styles from './InvoiceListItem.less';

const mapStateToProps = ({ daOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const { claimEntities } = daOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountInvoiceLevel(claimEntities, invoiceId);
  const percentValue = calculatPayableProportionInvoiceLevel(claimEntities, invoiceId);
  return {
    totalPayableAmount,
    percentValue,
    invoiceItem: daOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId],
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
      dispatch,
    }: any = this.props;

    const params = {
      totalPayableAmount,
      percentValue,
      uncoverAmount:
        Number(subtract(formUtils.queryValue(invoiceItem.expense), totalPayableAmount)) > 0
          ? subtract(formUtils.queryValue(invoiceItem.expense), totalPayableAmount)
          : 0,
    };
    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
        })}${formUtils.queryValue(invoiceItem.invoiceNo)}`}
        bordered={false}
        extra={
          <div
            className={styles.closeWrap}
            onClick={() => {
              dispatch({
                type: 'daOfClaimAssessmentController/removeInvoiceItem',
                payload: {
                  treatmentId: invoiceItem?.treatmentId,
                  invoiceId,
                },
              });
            }}
          >
            <Icon type="close" />
          </div>
        }
      >
        <SummaryPayableAmount params={params} />
        <InvoicePayableList
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
        />
        <InvoiceListItemOfBasicInfo
          invoiceItem={invoiceItem}
          totalPayableAmount={params.totalPayableAmount}
        />
        <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={invoiceId} />
      </Card>
    );
  }
}

export default InvoiceListItem;
