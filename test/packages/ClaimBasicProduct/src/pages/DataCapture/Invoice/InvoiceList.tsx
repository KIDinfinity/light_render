import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import InvoiceListItem from './InvoiceListItem';
// import styles from './InvoiceList.less';

@connect(({ bpOfDataCaptureController, claimEditable }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(bpOfDataCaptureController, 'claimProcessData.claimNo'),
  invoiceList: bpOfDataCaptureController.claimEntities.treatmentListMap[treatmentId].invoiceList,
  invoiceListMap: bpOfDataCaptureController.claimEntities.invoiceListMap,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class InvoiceList extends PureComponent {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const invoiceId = uuidv4();
    const serviceItemId = uuidv4();

    const addInvoiceItem = {
      ...INVOICEITEM,
      claimNo,
      id: invoiceId,
      serviceItemList: [serviceItemId],
      treatmentId,
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'bpOfDataCaptureController/addInvoiceItem',
      payload: {
        treatmentId,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  getInvoiceListFromEntities = () => {
    const { treatmentId, invoiceListMap } = this.props;

    const invoiceListMapEntries = Object.entries(invoiceListMap);
    const invoiceListFromEntities = [];
    lodash.map(invoiceListMapEntries, (item) => {
      if (item[1].treatmentId === treatmentId) {
        invoiceListFromEntities.push(item[1]);
      }
    });

    return invoiceListFromEntities;
  };

  render() {
    const { invoiceList, treatmentId, taskNotEditable } = this.props;
    const total = lodash.get(invoiceList, 'length', 0);
    const invoiceListFromEntities = this.getInvoiceListFromEntities();

    return (
      <div>
        {lodash.isArray(invoiceList) &&
          lodash.map(invoiceList, (item, index) => (
            <InvoiceListItem
              treatmentId={treatmentId}
              invoiceId={item}
              total={total}
              invoiceNo={index + 1}
              key={item}
              invoiceListFromEntities={invoiceListFromEntities}
            />
          ))}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
            })}
            buttonStyle={{ width: '100%', height: '36px' }}
          />
        )}
      </div>
    );
  }
}

export default InvoiceList;
