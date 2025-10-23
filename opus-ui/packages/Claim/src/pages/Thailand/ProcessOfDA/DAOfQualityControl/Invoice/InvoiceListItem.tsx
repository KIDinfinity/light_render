import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ServiceList from '../ServiceItem/ServiceList';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import styles from './InvoiceListItem.less';

const mapStateToProps = ({ daOfClaimCaseController, claimEditable }: any, { invoiceId }: any) => {
  return {
    invoiceItem: daOfClaimCaseController.claimEntities.invoiceListMap[invoiceId],
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class InvoiceListItem extends Component {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  componentDidMount = () => {
    const { dispatch, invoiceId }: any = this.props;
    dispatch({
      type: 'daOfClaimCaseController/saveServiceItemCallback',
      payload: {
        invoiceId,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, treatmentId, invoiceId }: any = this.props;
    dispatch({
      type: 'daOfClaimCaseController/removeInvoiceItem',
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
      incidentId,
      treatmentId,
      invoiceId,
      invoiceItem,
      invoiceNo,
      total,
      taskNotEditable,
    }: any = this.props;
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
        extra={cardStatus ? openHeader : closeHeader}
      >
        <InvoiceListItemOfBasicInfo
          invoiceItem={invoiceItem}
          incidentId={incidentId}
          treatmentId={treatmentId}
        />
        {cardStatus && (
          <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={invoiceId} />
        )}
      </Card>
    );
  }
}

export default InvoiceListItem;
