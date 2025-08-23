/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {
  VLD_000015,
  VLD_000230,
  VLD_000022,
  VLD_000021,
} from 'claim/pages/validators/fieldValidators';
import type { IInvoice } from '@/dtos/claim';
import { add } from '@/utils/precisionUtils';
import { CauseOfIncident } from 'claim/enum/CauseOfIncident';
import { InvoiceListItemOfBasicInfoLayout } from '../FormLayout.json';
import {
  FormLayout,
  FormItemInput,
  FormItemNumber,
  FormItemCheckbox,
  FormItemDatePicker,
} from 'basic/components/Form';
const FORMID_PREFIX = 'InvoiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoiceItem: IInvoice;
  totalPayableAmount: number;
  validating: boolean;
}

const mapStateToProps = (
  { daOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { invoiceItem }: any
) => {
  const serviceItemList = lodash.get(
    daOfClaimAssessmentController,
    `claimEntities.invoiceListMap.${invoiceItem.id}.serviceItemList`
  );
  const totalExpense = lodash
    .filter(lodash.get(daOfClaimAssessmentController, 'claimEntities.serviceItemListMap'), (item) =>
      lodash.includes(serviceItemList, item.id)
    )
    .reduce((sum, n) => add(sum, formUtils.queryValue(n.expense) || 0), 0);

  return {
    totalExpense,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    invoiceListMap: daOfClaimAssessmentController?.claimEntities?.invoiceListMap,
    serviceItemListMap: daOfClaimAssessmentController?.claimEntities?.serviceItemListMap,
    invoiceList:
      daOfClaimAssessmentController?.claimEntities?.treatmentListMap?.[invoiceItem?.treatmentId]
        ?.invoiceList,
    incidentItem:
      daOfClaimAssessmentController?.claimEntities?.incidentListMap?.[invoiceItem?.incidentId],
  };
};
@connect(mapStateToProps)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoiceItem, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              invoiceId: invoiceItem.id,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveInvoiceItem',
          payload: {
            changedFields,
            invoiceId: invoiceItem.id,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { invoiceItem, invoiceListMap, serviceItemListMap }: any = props;

    const { serviceItemList } = invoiceListMap[invoiceItem.id];

    let summaryOfServiceItem: number = null;

    serviceItemList?.forEach((id: any) => {
      const expense = serviceItemListMap?.[id]?.expense || 0;
      summaryOfServiceItem = add(summaryOfServiceItem, formUtils.queryValue(expense));
    });

    return formUtils.mapObjectToFields(
      { ...invoiceItem, summaryOfServiceItem },
      {
        expense: (value: any) => value,
        remark: (value: any) => value,
        isClaimWithOtherInsurer: (value: any) => value,
      }
    );
  },
})
class InvoiceListItemOfBasicInfo extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form, invoiceItem } = this.props;

    if (invoiceItem.id) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceItem.id}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, invoiceItem } = this.props;

    if (invoiceItem.id) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${invoiceItem.id}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const {
      form,
      taskNotEditable,
      invoiceItem,
      totalPayableAmount,
      InvoiceListMap,
      invoiceList,
      incidentItem,
    }: any = this.props;

    const isillness =
      formUtils.queryValue(incidentItem?.causeOfIncident) === CauseOfIncident.illness;

    const invoiceNoList = lodash.map(invoiceList, (item) => {
      if (item !== invoiceItem.id) {
        return formUtils.queryValue(InvoiceListMap?.[item]?.invoiceNo);
      }
    });

    return (
      <Form layout="vertical">
        <FormLayout json={InvoiceListItemOfBasicInfoLayout}>
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="invoiceNo"
            name="expense"
            rules={[
              {
                validator: VLD_000021(invoiceNoList),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-no"
            maxLength={15}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            required
            rules={[
              {
                validator: VLD_000022(
                  formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
                  'day',
                  isillness
                ),
              },
            ]}
            formName="invoiceDate"
            labelId="app.navigator.task-detail-of-data-capture.label.invoice-date"
            format="L"
            name="expense"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            required
            name="expense"
            formName="expense"
            rules={[
              {
                validator: VLD_000015(this),
              },
              {
                validator: VLD_000230(totalPayableAmount),
              },
            ]}
            labelId="app.claim.label-total-net-expense"
            min={0}
            max={999999999.99}
          />
          <FormItemNumber
            form={form}
            disabled
            name="summaryOfServiceItem"
            formName="summaryOfServiceItem"
            labelId="app.claim.label-summary-of-service-item"
            min={0}
            max={999999999.99}
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="isClaimWithOtherInsurer"
            labelId="app.claim.invoice.label.claim-with-other-insurer"
          />
          <FormItemNumber
            form={form}
            formName="otherInsurerPaidAmount"
            labelId="otherInsurerPaidAmount"
            name="otherInsurerPaidAmount"
            precision={2}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            name="remark"
            formName="remark"
            maxLength={240}
            labelId="app.claim.label-invoice-remark"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default InvoiceListItemOfBasicInfo;
