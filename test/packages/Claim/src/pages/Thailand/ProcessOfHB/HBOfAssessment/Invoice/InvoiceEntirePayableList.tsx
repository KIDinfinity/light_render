import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import InvoiceEntirePayableItem from './InvoiceEntirePayableItem';

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const { claimEntities } = hbOfClaimAssessmentController;
  const invoicePayableListMapEntries = Object.entries(claimEntities.invoicePayableListMap);
  const invoicePayableList: any[] = [];
  lodash.forEach(invoicePayableListMapEntries, (item: any) => {
    if (item[1].invoiceId === invoiceId && !item[1].is_delete) {
      invoicePayableList.push({
        invoicePayableItemId: item[0],
        policyNo: formUtils.queryValue(item[1].policyNo),
      });
    }
  });

  return {
    curInvoicePayableList: lodash.map(invoicePayableList, (item: any) => item.invoicePayableItemId),
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
  };
};

interface IProps {
  curInvoicePayableList: string[];
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
}

@connect(mapStateToProps)
class InvoiceEntirePayableList extends Component<IProps> {
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
    const { curInvoicePayableList, incidentId, treatmentId, invoiceId } = this.props;
    const list: string[] = lodash.compact(curInvoicePayableList);

    return (
      <div>
        {lodash.map(list, (item: string, index: number) => (
          <InvoiceEntirePayableItem
            invoicePayableItemId={item}
            invoicePayableItemNextId={index === list.length - 1 ? '' : list[index + 1]}
            incidentId={incidentId}
            treatmentId={treatmentId}
            invoiceId={invoiceId}
            key={item}
          />
        ))}
      </div>
    );
  }
}

export default InvoiceEntirePayableList;
