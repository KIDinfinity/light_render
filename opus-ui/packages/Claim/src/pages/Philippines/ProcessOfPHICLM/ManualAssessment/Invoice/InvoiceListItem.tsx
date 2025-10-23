import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import moment from 'moment';
import { calculatPayableAmountInvoiceLevel } from 'claim/pages/utils/calculatPayableAmount';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryPayableAmount from 'claim/components/SummaryPayableAmount';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import InvoicePayableList from './InvoicePayableList';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import styles from './InvoiceListItem.less';

const mapStateToProps = (
  { PHCLMOfClaimAssessmentController, claimEditable }: any,
  { invoiceId }: any
) => {
  const { claimEntities } = PHCLMOfClaimAssessmentController;

  const totalPayableAmount = calculatPayableAmountInvoiceLevel(claimEntities, invoiceId);
  const percentValue = totalPayableAmount > 0 ? 100 : 0;
  const invoiceItem = lodash.get(
    PHCLMOfClaimAssessmentController,
    `claimEntities.invoiceListMap.${invoiceId}`
  );
  return {
    totalPayableAmount,
    percentValue,
    invoiceNo: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceNo')),
    expense: formUtils.queryValue(lodash.get(invoiceItem, 'expense')),
    invoiceDate: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceDate')),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class InvoiceListItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, treatmentId, invoiceId } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeInvoiceItem',
      payload: {
        treatmentId,
        invoiceId,
      },
    });
  };

  render() {
    const {
      incidentId,
      treatmentId,
      invoiceId,
      invoiceDate,
      invoiceNo,
      totalPayableAmount,
      percentValue,
      invoiceListFromEntities,
      taskNotEditable,
    }: any = this.props;

    const summaryParams = {
      totalPayableAmount,
      percentValue,
    };

    return (
      <div className={styles.invoiceItem}>
        <Card
          title={
            invoiceNo
              ? `${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
                })}${invoiceNo}`
              : `${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
                })}`
          }
          bordered={false}
          extra={
            <span>
              {!taskNotEditable && <ButtonOfSmall icon="close" handleClick={this.handleDelete} />}
              {moment(invoiceDate).isValid() && moment(invoiceDate).format('L')}
            </span>
          }
        >
          <SummaryPayableAmount params={summaryParams} />
          <InvoicePayableList
            incidentId={incidentId}
            treatmentId={treatmentId}
            invoiceId={invoiceId}
          />
          <InvoiceListItemOfBasicInfo
            invoiceId={invoiceId}
            invoiceListFromEntities={invoiceListFromEntities}
          />
        </Card>
      </div>
    );
  }
}

export default InvoiceListItem;
