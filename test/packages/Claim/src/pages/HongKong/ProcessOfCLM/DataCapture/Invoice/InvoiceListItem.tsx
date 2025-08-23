import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { validateServiceItem } from 'claimBasicProduct/pages/validators';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import ServiceList from '../ServiceItem/ServiceList';
import styles from './InvoiceListItem.less';

@connect(
  (
    { claimEditable, HKCLMOfDataCaptureController, formCommonController }: any,
    { treatmentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
    procedureList:
      HKCLMOfDataCaptureController.claimEntities.treatmentListMap[treatmentId].procedureList,
    invoiceListMap: HKCLMOfDataCaptureController.claimEntities.invoiceListMap,
    serviceItemListMap: HKCLMOfDataCaptureController.claimEntities.serviceItemListMap,
  })
)
class InvoiceListItem extends PureComponent {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, invoiceId } = this.props;
    dispatch({
      type: 'HKCLMOfDataCaptureController/removeInvoiceItem',
      payload: {
        treatmentId,
        invoiceId,
      },
    });
  };

  onClose = () => {
    this.setState({
      cardStatus: false,
    });
  };

  onOpen = () => {
    this.setState({
      cardStatus: true,
    });
  };

  render() {
    const {
      total,
      invoiceNo,
      invoiceId,
      invoiceListFromEntities,
      taskNotEditable,
      serviceItemListMap,
      invoiceListMap,
      treatmentId,
      procedureList,
      submited,
    } = this.props;
    const { cardStatus } = this.state;

    const openHeader = (
      <div className={styles.cardExtra}>
        <ButtonOfSmall icon="minus" handleClick={this.onClose} />
        {!taskNotEditable && <ButtonOfSmall icon="close" handleClick={this.handleDelete} />}
      </div>
    );

    const closeHeader = (
      <div className={styles.cardExtra}>
        <ButtonOfSmall icon="plus" handleClick={this.onOpen} />
        <span className={styles.currentNo}>
          {invoiceNo}/{total}
        </span>
      </div>
    );
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
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
            })}
            {submited && !isEqual && <ErrorTooltipManual manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000475' })} />}
          </>
        }
        bordered={false}
        style={{ width: '100%', marginBottom: '10px' }}
        extra={cardStatus ? openHeader : closeHeader}
      >
        <InvoiceListItemOfBasicInfo
          invoiceId={invoiceId}
          invoiceListFromEntities={invoiceListFromEntities}
        />
        {cardStatus && <ServiceList invoiceId={invoiceId} />}
      </Card>
    );
  }
}

export default InvoiceListItem;
