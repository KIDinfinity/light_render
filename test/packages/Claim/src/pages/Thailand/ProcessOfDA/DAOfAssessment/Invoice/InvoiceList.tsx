import React, { Component } from 'react';
import{ v4 as  uuidv4 } from 'uuid';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { isPreArrangement, isReimbursement } from 'claim/pages/Thailand/flowConfig';
import InvoiceListItem from './InvoiceListItem';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { INVOICEITEM } from '@/utils/claimConstant';
import styles from './InvoiceListItem.less';

@connect(
  ({ daOfClaimAssessmentController, claimEditable, formCommonController }, { treatmentId }) => ({
    invoiceList:
      daOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId]?.invoiceList,
    submited: formCommonController.submited,
    caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    claimNo: lodash.get(daOfClaimAssessmentController, 'claimProcessData.claimNo'),
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
      type: 'daOfClaimAssessmentController/addInvoiceItem',
      payload: {
        treatmentId,
        addInvoiceItem,
      },
    });
  };

  render() {
    const {
      taskNotEditable,
      invoiceList,
      incidentId,
      treatmentId,
      submited,
      caseCategory,
    } = this.props;
    const disabledCategory = isPreArrangement(caseCategory) || isReimbursement(caseCategory);

    return (
      <div>
        {submited &&
          lodash.isArray(invoiceList) &&
          invoiceList.length === 0 &&
          !disabledCategory && (
            <ErrorTooltipManual
              manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000051' })}
            />
          )}
        {lodash.isArray(invoiceList) &&
          lodash.map(invoiceList, (item) => (
            <InvoiceListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item}
              key={item}
            />
          ))}
        {!taskNotEditable && (
          <div className={styles.addWrap}>
            <ButtonOfClaim
              handleClick={this.handleAdd}
              buttonText={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
              })}
              buttonStyle={{ width: '100%', height: '36px' }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default InvoiceList;
