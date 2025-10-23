import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import InvoicePayableListItem from './InvoicePayableListItem';
import InvoicePayableListItemAdd from './InvoicePayableListItemAdd';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';
import { getInvoicePayableIdList } from 'claim/pages/utils/selector';

@connect(({ daOfClaimAssessmentController, claimEditable }, { invoiceId }) => ({
  curInvoicePayableList: getInvoicePayableIdList(
    invoiceId,
    daOfClaimAssessmentController.claimEntities.invoicePayableListMap
  ),
  invoicePayableAddItem: daOfClaimAssessmentController.invoicePayableAddItem,
  claimNo: daOfClaimAssessmentController.claimProcessData.claimNo,
  taskNotEditable: claimEditable.taskNotEditable,
  claimPayableListMap: daOfClaimAssessmentController.claimEntities.claimPayableListMap,
  invoicePayableListMap: daOfClaimAssessmentController.claimEntities.invoicePayableListMap,
}))
class InvoiceListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      curInvoicePayableList: nextCurInvoicePayableList,
      invoicePayableAddItem: nextInvoicePayableAddItem,
      claimPayableListMap: nextClaimPayableListMap,
    } = nextProps;
    const { curInvoicePayableList, invoicePayableAddItem, claimPayableListMap } = this.props;

    return (
      !lodash.isEqual(nextCurInvoicePayableList, curInvoicePayableList) ||
      !lodash.isEqual(nextInvoicePayableAddItem, invoicePayableAddItem) ||
      !lodash.isEqual(nextClaimPayableListMap, claimPayableListMap)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, invoiceId } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/addInvoicePayableItem',
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
      claimPayableListMap,
      invoicePayableListMap,
    } = this.props;

    const isBelongToCurrentItem =
      invoicePayableAddItem && invoiceId === invoicePayableAddItem.invoiceId;
    return (
      <div>
        {curInvoicePayableList &&
          lodash.map(curInvoicePayableList, (item: any) => {
            const claimDecision =
              claimPayableListMap?.[invoicePayableListMap?.[item]?.payableId]?.claimDecision;
            const isDeny = formUtils.queryValue(claimDecision) === enumClaimDecision.deny;
            return isDeny ? null : (
              <InvoicePayableListItem invoicePayableItemId={item} key={item} />
            );
          })}
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

export default InvoiceListItemOfPayableList;
