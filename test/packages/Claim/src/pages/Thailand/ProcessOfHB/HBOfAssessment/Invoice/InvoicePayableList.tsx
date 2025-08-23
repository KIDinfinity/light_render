import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import InvoicePayableListItem from './InvoicePayableListItem';
import InvoicePayableListItemAdd from './InvoicePayableListItemAdd';

const mapStateToProps = (
  { hbOfClaimAssessmentController, claimEditable }: any,
  { invoiceId }: any
) => {
  const { claimEntities } = hbOfClaimAssessmentController;
  const invoicePayableListMapEntries = Object.entries(claimEntities.invoicePayableListMap);
  const invoicePayableListItemIds: any = [];
  lodash.map(invoicePayableListMapEntries, (item: any) => {
    if (item[1].invoiceId === invoiceId && !item[1].is_delete) {
      invoicePayableListItemIds.push({
        invoicePayableItemId: item[0],
        policyNo: formUtils.queryValue(item[1].policyNo),
      });
    }
  });
  return {
    curInvoicePayableList: lodash.map(
      invoicePayableListItemIds,
      (item) => item.invoicePayableItemId
    ),
    invoicePayableAddItem: hbOfClaimAssessmentController.invoicePayableAddItem,
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class InvoiceListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      curInvoicePayableList: nextCurInvoicePayableList,
      invoicePayableAddItem: nextInvoicePayableAddItem,
    } = nextProps;
    const { curInvoicePayableList, invoicePayableAddItem } = this.props;

    return (
      !lodash.isEqual(nextCurInvoicePayableList, curInvoicePayableList) ||
      !lodash.isEqual(nextInvoicePayableAddItem, invoicePayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, invoiceId } = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/addInvoicePayableItem',
      payload: {
        incidentId,
        treatmentId,
        invoiceId,
      },
    });
  };

  render() {
    const {
      curInvoicePayableList,
      invoicePayableAddItem,
      incidentId,
      treatmentId,
      invoiceId,
      taskNotEditable,
    } = this.props;

    const isBelongToCurrentItem =
      invoicePayableAddItem && invoiceId === invoicePayableAddItem.invoiceId;

    return (
      <div>
        {curInvoicePayableList &&
          lodash.map(curInvoicePayableList, (item) => (
            <InvoicePayableListItem invoicePayableItemId={item} key={item} />
          ))}
        {invoicePayableAddItem && isBelongToCurrentItem && (
          <InvoicePayableListItemAdd
            incidentId={incidentId}
            treatmentId={treatmentId}
            invoicePayableItemDetail={invoicePayableAddItem}
          />
        )}
        {!taskNotEditable && false && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.invoice-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default InvoiceListItemOfPayableList;
