import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import styles from './InvoiceListItem.less';

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class InvoiceListItem extends PureComponent {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, invoiceId } = this.props;
    dispatch({
      type: 'PHCLMOfDataCaptureController/removeInvoiceItem',
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
    const { total, invoiceNo, invoiceId, invoiceListFromEntities, taskNotEditable } = this.props;
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

    return (
      <Card
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
        })}
        bordered={false}
        style={{ width: '100%', marginBottom: '10px' }}
        extra={cardStatus ? openHeader : closeHeader}
      >
        <InvoiceListItemOfBasicInfo
          invoiceId={invoiceId}
          invoiceListFromEntities={invoiceListFromEntities}
        />
        {/* {cardStatus && <ServiceList invoiceId={invoiceId} />} */}
      </Card>
    );
  }
}

export default InvoiceListItem;
