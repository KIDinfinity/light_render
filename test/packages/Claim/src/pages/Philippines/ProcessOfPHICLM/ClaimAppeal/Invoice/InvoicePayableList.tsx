import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getInvoicePayableIdList } from 'claim/pages/utils/selector';
import { withContextData } from '@/components/_store';
import InvoicePayableListItem from './InvoicePayableListItem';
import InvoicePayableListItemAdd from './InvoicePayableListItemAdd';

@connect(
  (
    { PHCLMOfAppealCaseController, claimEditable }: any,
    { invoiceId, withData: { caseType } }: any
  ) => ({
    curInvoicePayableList: getInvoicePayableIdList(
      invoiceId,
      caseType
        ? PHCLMOfAppealCaseController[caseType].claimEntities.invoicePayableListMap
        : PHCLMOfAppealCaseController.claimEntities.invoicePayableListMap
    ),
    invoicePayableAddItem: caseType
      ? PHCLMOfAppealCaseController[caseType].invoicePayableAddItem
      : PHCLMOfAppealCaseController.invoicePayableAddItem,
    claimNo: caseType
      ? PHCLMOfAppealCaseController[caseType].claimProcessData.claimNo
      : PHCLMOfAppealCaseController.claimProcessData.claimNo,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class InvoiceListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      claimNo: nextClaimNo,
      curInvoicePayableList: nextCurInvoicePayableList,
      invoicePayableAddItem: nextInvoicePayableAddItem,
    } = nextProps;
    const { claimNo, curInvoicePayableList, invoicePayableAddItem }: any = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curInvoicePayableList, nextCurInvoicePayableList) ||
      !lodash.isEqual(invoicePayableAddItem, nextInvoicePayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, claimNo, incidentId, treatmentId, invoiceId }: any = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/addInvoicePayableItem',
      payload: {
        claimNo,
        incidentId,
        treatmentId,
        invoiceId,
      },
    });
  };

  render() {
    const {
      invoicePayableAddItem,
      incidentId,
      treatmentId,
      invoiceId,
      curInvoicePayableList,
      taskNotEditable: notEditable,
      withData,
    }: any = this.props;

    const isBelongToCurrentItem =
      invoicePayableAddItem && invoiceId === invoicePayableAddItem.invoiceId;
    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

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
        {!taskNotEditable && (
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

export default withContextData(InvoiceListItemOfPayableList);
