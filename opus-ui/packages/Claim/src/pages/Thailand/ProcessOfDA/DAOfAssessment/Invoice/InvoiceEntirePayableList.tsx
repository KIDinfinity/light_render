import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { getInvoicePayableIdList } from 'claim/pages/utils/selector';
import InvoiceEntirePayableItem from './InvoiceEntirePayableItem';

interface IProps {
  curInvoicePayableList: string[];
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
}

@connect(({ daOfClaimAssessmentController }: any, { invoiceId }: any) => ({
  curInvoicePayableList: getInvoicePayableIdList(
    invoiceId,
    daOfClaimAssessmentController.claimEntities.invoicePayableListMap
  ),
  claimNo: daOfClaimAssessmentController.claimProcessData.claimNo,
}))
class InvoiceEntirePayableList extends Component<IProps> {
  shouldComponentUpdate(nextProps) {
    const { claimNo: nextClaimNo, curInvoicePayableList: nextCurInvoicePayableList } = nextProps;
    const { claimNo, curInvoicePayableList } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curInvoicePayableList, nextCurInvoicePayableList)
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
