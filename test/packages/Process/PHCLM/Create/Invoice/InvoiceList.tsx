import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import {v4 as uuidv4 } from 'uuid';
import { isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import InvoiceListItem from './InvoiceListItem';

@connect(({ hkProcessController, formCommonController }: any, { treatmentId }: any) => ({
  invoiceList: lodash.get(
    hkProcessController,
    `claimEntities.treatmentListMap.${treatmentId}.invoiceList`,
    []
  ),
  submited: formCommonController.submited,
  claimNo: lodash.get(hkProcessController, 'claimProcessData.claimNo'),
  caseCategory: lodash.get(hkProcessController, 'claimProcessData.caseCategory'),
}))
class InvoiceList extends Component {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo }: any = this.props;
    const invoiceId = uuidv4();
    const serviceItemId = uuidv4();
    const addInvoiceItem = {
      ...INVOICEITEM,
      id: invoiceId,
      treatmentId,
      claimNo,
      exchangeDate: moment().format(),
      invoiceCurrency: tenant.currency(),
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };
    dispatch({
      type: 'hkProcessController/addInvoiceItem',
      payload: {
        treatmentId,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  render() {
    const { invoiceList, incidentId, treatmentId, submited, caseCategory } = this.props;
    const { length: total } = invoiceList;
    return (
      <div>
        {submited &&
          lodash.isArray(invoiceList) &&
          invoiceList.length === 0 &&
          !isPreArrangement(caseCategory) && (
            <ErrorTooltipManual
              manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000051' })}
            />
          )}
        {lodash.isArray(invoiceList) &&
          invoiceList.map((item, index) => (
            <InvoiceListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item}
              total={total}
              invoiceNo={index + 1}
              key={item}
            />
          ))}
        <ButtonOfClaim
          handleClick={this.handleAdd}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
          })}
          buttonStyle={{ width: '100%', height: '36px' }}
        />
      </div>
    );
  }
}

export default InvoiceList;
