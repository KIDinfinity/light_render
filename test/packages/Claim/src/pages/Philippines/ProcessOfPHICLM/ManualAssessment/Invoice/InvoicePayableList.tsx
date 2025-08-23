import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getInvoicePayableIdList } from 'claim/pages/utils/selector';
import InvoicePayableListItem from './InvoicePayableListItem';
import InvoicePayableListItemAdd from './InvoicePayableListItemAdd';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

@connect(({ PHCLMOfClaimAssessmentController, claimEditable }: any, { invoiceId }: any) => ({
  curInvoicePayableList: getInvoicePayableIdList(
    invoiceId,
    PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap
  ),
  invoicePayableAddItem: PHCLMOfClaimAssessmentController.invoicePayableAddItem,
  claimNo: PHCLMOfClaimAssessmentController.claimProcessData.claimNo,
  taskNotEditable: claimEditable.taskNotEditable,
  claimPayableListMap: PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
  invoicePayableListMap: PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap,
}))
class InvoiceListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      claimNo: nextClaimNo,
      curInvoicePayableList: nextCurInvoicePayableList,
      invoicePayableAddItem: nextInvoicePayableAddItem,
      claimPayableListMap: nextClaimPayableListMap,
      invoicePayableListMap: nextInvoicePayableListMap,
    } = nextProps;
    const {
      claimNo,
      curInvoicePayableList,
      invoicePayableAddItem,
      claimPayableListMap,
      invoicePayableListMap,
    }: any = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curInvoicePayableList, nextCurInvoicePayableList) ||
      !lodash.isEqual(invoicePayableAddItem, nextInvoicePayableAddItem) ||
      !lodash.isEqual(claimPayableListMap, nextClaimPayableListMap) ||
      !lodash.isEqual(invoicePayableListMap, nextInvoicePayableListMap)
    );
  }

  get exitBenefitCategory() {
    const { claimPayableListMap, invoicePayableListMap }: any = this.props;
    const exict = lodash.some(
      claimPayableListMap,
      (item) => item.benefitCategory === eBenefitCategory.Reimbursement
    );
    if (!exict) return '';
    return lodash.size(invoicePayableListMap)
      ? ''
      : formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  }

  handleAdd = () => {
    const { dispatch, claimNo, incidentId, treatmentId, invoiceId }: any = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addInvoicePayableItem',
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
      taskNotEditable,
    }: any = this.props;

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
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            errorMessage={this.exitBenefitCategory}
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
