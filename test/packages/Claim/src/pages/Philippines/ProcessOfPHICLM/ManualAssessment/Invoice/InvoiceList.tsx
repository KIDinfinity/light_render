import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import InvoiceListItem from './InvoiceListItem';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

@connect(({ PHCLMOfClaimAssessmentController, claimEditable }: any, { treatmentId }: any) => ({
  invoiceList:
    PHCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].invoiceList,
  invoiceListMap: PHCLMOfClaimAssessmentController.claimEntities.invoiceListMap,
  taskNotEditable: claimEditable.taskNotEditable,
  claimNo: lodash.get(PHCLMOfClaimAssessmentController, 'claimProcessData.claimNo'),
  claimPayableListMap: PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
}))
class InvoiceList extends PureComponent {
  get invoiceListFromEntities() {
    const { treatmentId, invoiceListMap } = this.props;

    const invoiceListMapEntries = Object.entries(invoiceListMap);
    const invoiceListFromEntities = [];
    lodash.map(invoiceListMapEntries, (item) => {
      if (item[1].treatmentId === treatmentId) {
        invoiceListFromEntities.push(item[1]);
      }
    });

    return invoiceListFromEntities;
  }

  get exitBenefitCategory() {
    const { claimPayableListMap, invoiceListMap }: any = this.props;
    const exict = lodash.some(
      claimPayableListMap,
      (item) => item.benefitCategory === eBenefitCategory.Reimbursement
    );
    if (!exict) return '';
    return lodash.size(invoiceListMap)
      ? ''
      : formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  }

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
      type: 'PHCLMOfClaimAssessmentController/addInvoiceItem',
      payload: {
        treatmentId,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  render() {
    const { invoiceList, incidentId, treatmentId, taskNotEditable }: any = this.props;

    return (
      <div>
        {lodash.isArray(invoiceList) &&
          lodash.map(invoiceList, (item) => (
            <InvoiceListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item}
              key={item}
              invoiceListFromEntities={this.invoiceListFromEntities}
            />
          ))}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            errorMessage={this.exitBenefitCategory}
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
