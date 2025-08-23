/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import type { IInvoice } from '@/dtos/claim';
import { VLD_000022, VLD_000015, VLD_000021 } from 'claim/pages/validators/fieldValidators';
import { isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import { CauseOfIncident } from 'claim/enum/CauseOfIncident';
import { add } from '@/utils/precisionUtils';
import { InvoiceListItemOfBasicInfoLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'InvoiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  invoiceItem: IInvoice;
  validating: boolean;
}

const mapStateToProps = (
  { daOfClaimCaseController, formCommonController, claimEditable }: any,
  { treatmentId, incidentId, invoiceItem }: any
) => {
  const incidentItem = lodash.get(
    daOfClaimCaseController,
    `claimEntities.incidentListMap.${incidentId}`
  );
  const invoiceList = lodash.get(
    daOfClaimCaseController,
    `claimEntities.treatmentListMap.${treatmentId}.invoiceList`
  );
  const serviceItemList = lodash.get(
    daOfClaimCaseController,
    `claimEntities.invoiceListMap.${invoiceItem.id}.serviceItemList`
  );
  const totalExpense = lodash
    .filter(lodash.get(daOfClaimCaseController, 'claimEntities.serviceItemListMap'), (item) =>
      lodash.includes(serviceItemList, item.id)
    )
    .reduce((sum, n) => add(sum, formUtils.queryValue(n.expense) || 0), 0);

  const InvoiceListMap = lodash.get(daOfClaimCaseController, 'claimEntities.invoiceListMap');
  const invoiceNoList = lodash.map(invoiceList, (item) => {
    if (item !== invoiceItem.id) {
      return formUtils.queryValue(InvoiceListMap[item].invoiceNo);
    }
  });

  return {
    incidentItem,
    invoiceNoList,
    totalExpense,
    validating: formCommonController.validating,
    caseCategory: lodash.get(daOfClaimCaseController, 'claimProcessData.caseCategory'),
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'daOfClaimCaseController/saveEntry',
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              invoiceId: invoiceItem.id,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimCaseController/saveFormData',
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
    const { invoiceItem } = props;
    return formUtils.mapObjectToFields(invoiceItem, {
      invoiceNo: (value: any) => value,
      invoiceDate: (value: any) => (value ? moment(value) : null),
      expense: (value: any) => value,
      summaryOfServiceItem: (value: any) => value,
      remark: (value: any) => value,
      isClaimWithOtherInsurer: (value: any) => value,
    });
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
    const { form, incidentItem, invoiceNoList, caseCategory, taskNotEditable }: any = this.props;
    const isillness =
      formUtils.queryValue(incidentItem.causeOfIncident) === CauseOfIncident.illness;
    return (
      <Form layout="vertical">
        <FormLayout json={InvoiceListItemOfBasicInfoLayout}>
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            requiredTriggerValidate
            required={!isPreArrangement(caseCategory)}
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
            requiredTriggerValidate
            required={!isPreArrangement(caseCategory)}
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
