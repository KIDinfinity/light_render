import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { INVOICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import{ v4 as  uuidv4 } from 'uuid';
import { isPreArrangement, isReimbursement } from 'claim/pages/Thailand/flowConfig';
import InvoiceListItem from './InvoiceListItem';

@connect(
  (
    { daOfClaimCaseController, formCommonController, claimEditable }: any,
    { treatmentId }: any
  ) => ({
    invoiceList: lodash.get(
      daOfClaimCaseController,
      `claimEntities.treatmentListMap.${treatmentId}.invoiceList`,
      []
    ),
    submited: formCommonController.submited,
    claimNo: lodash.get(daOfClaimCaseController, 'claimProcessData.claimNo'),
    caseCategory: lodash.get(daOfClaimCaseController, 'claimProcessData.caseCategory'),
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class InvoiceList extends Component {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo }: any = this.props;
    const invoiceId = uuidv4();
    const addInvoiceItem = {
      ...INVOICEITEM,
      id: invoiceId,
      treatmentId,
      claimNo,
    };

    dispatch({
      type: 'daOfClaimCaseController/addInvoiceItem',
      payload: {
        treatmentId,
        addInvoiceItem,
      },
    });
  };

  render() {
    const {
      invoiceList,
      incidentId,
      treatmentId,
      submited,
      caseCategory,
      taskNotEditable,
    } = this.props;
    const total = (lodash.isArray(invoiceList) && invoiceList.length) || 0;
    const disabledCategory = isPreArrangement(caseCategory) || isReimbursement(caseCategory);
    return (
      <div>
        {submited && lodash.isEmpty(invoiceList) && !disabledCategory && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000051' })}
          />
        )}
        {lodash.isArray(invoiceList) &&
          lodash.map(invoiceList, (item, index) => (
            <InvoiceListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item}
              total={total}
              invoiceNo={index + 1}
              key={item}
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
