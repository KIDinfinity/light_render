import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { withContextData } from '@/components/_store';
import InvoiceListItem from './InvoiceListItem';

@connect(({ PHCLMOfAppealCaseController }: any, { treatmentId, withData: { caseType } }: any) => ({
  invoiceList: caseType
    ? PHCLMOfAppealCaseController[caseType].claimEntities.treatmentListMap[treatmentId].invoiceList
    : PHCLMOfAppealCaseController.claimEntities.treatmentListMap[treatmentId].invoiceList,
  invoiceListMap: caseType
    ? PHCLMOfAppealCaseController[caseType].claimEntities.invoiceListMap
    : PHCLMOfAppealCaseController.claimEntities.invoiceListMap,
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

  render() {
    const { invoiceList, incidentId, treatmentId }: any = this.props;

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
      </div>
    );
  }
}

export default withContextData(InvoiceList);
