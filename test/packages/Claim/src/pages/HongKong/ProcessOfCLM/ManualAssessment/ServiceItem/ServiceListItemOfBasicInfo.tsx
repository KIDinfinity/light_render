import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import { isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';
import { ServiceCode } from 'claim/pages/Enum';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelect, FormItemInput, formUtils } from 'basic/components/Form';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

@connect(
  (
    {
      HKCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
      dictionaryController,
    }: any,
    { serviceItemId, invoiceId }: any
  ) => ({
    serviceItem: HKCLMOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
    dictsOfSurgeryClass: dictionaryController.Dropdown_CLM_SurgeryClass,
    taskNotEditable: claimEditable.taskNotEditable,
    invoiceItem: HKCLMOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId],
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveServiceItem',
            payload: {
              changedFields,
              serviceItemId,
              invoiceId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveServiceItem',
          payload: {
            changedFields,
            serviceItemId,
            invoiceId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { serviceItem } = props;

    return formUtils.mapObjectToFields(serviceItem, {
      expense: (value) => value,
      unit: (value) => value,
      otherInsurerPaidAmount: (value: any) => value,
      serviceItemDescription: (value: any) => value,
      surgeryClass: (value: any) => value,
    });
  },
})
class ServiceListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, invoiceId, serviceItemId }: any = this.props;

    dispatch({
      type: 'HKCLMOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const {
      form,
      taskNotEditable,
      invoiceItem,
      dictsOfSurgeryClass,
      serviceItem,
    }: any = this.props;
    const invoiceCurrency = invoiceItem?.invoiceCurrency;
    const serviceItemValue = formUtils.queryValue(serviceItem.serviceItem);
    const isRequired = serviceItemValue === ServiceCode.code;
    const isServiceItem = isServiceItemRequired(serviceItemValue);
    return (
      <Form layout="vertical" style={{ width: '100%', padding: '5px 10px' }}>
        <FormLayout json={serviceItemLayout}>
          <FormItemCurrency
            form={form}
            disabled={taskNotEditable}
            required
            formName="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.expense"
            currencyCode={invoiceCurrency}
            hiddenPrefix
            hiddenDropDown
            name="fieldOne"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            required={isServiceItem}
            formName="unit"
            labelId="app.navigator.task-detail-of-data-capture.label.unit"
            precision={0}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="serviceItemDescription"
            labelId="serviceItemDescription"
            name="fieldOne"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required={isRequired}
            dicts={dictsOfSurgeryClass}
            formName="surgeryClass"
            labelId="surgeryClass"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            formName="otherInsurerPaidAmount"
            labelId="otherInsurerPaidAmount"
            precision={2}
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ServiceListItem;
