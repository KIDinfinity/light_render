import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemNumber,
  FormItemSelectPlus,
  FormItemInput,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { ServiceCode } from 'claim/pages/Enum';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import CardOfClaim from 'basic/components/Form/FormCard';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

@connect(
  (
    {
      HKCLMOfDataCaptureController,
      formCommonController,
      claimEditable,
      dictionaryController,
    }: any,
    { serviceItemId, invoiceId }: any
  ) => ({
    serviceItem: HKCLMOfDataCaptureController.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfSurgeryClass: dictionaryController.Dropdown_CLM_SurgeryClass,
    invoiceItem: HKCLMOfDataCaptureController.claimEntities.invoiceListMap[invoiceId],
    serviceItemListMap: HKCLMOfDataCaptureController.claimEntities.serviceItemListMap,
    repeatableServiceItemList: HKCLMOfDataCaptureController.repeatableServiceItemList,
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
            type: 'HKCLMOfDataCaptureController/saveEntry',
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
          type: 'HKCLMOfDataCaptureController/saveFormData',
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
    const { serviceItem }: any = props;

    return formUtils.mapObjectToFields(serviceItem, {
      serviceItem: (value: any) => value,
      unit: (value: any) => value,
      expense: (value: any) => value,
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
      type: 'HKCLMOfDataCaptureController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  onSelect = (value: any) => {
    const { dispatch, invoiceId }: any = this.props;

    dispatch({
      type: 'HKCLMOfDataCaptureController/getRepeatableByServiceCode',
      payload: {
        codes: [value],
        invoiceId,
      },
    });
  };

  render() {
    const {
      form,
      repeatableServiceItemList,
      taskNotEditable,
      invoiceItem,
      invoiceId,
      dictsOfSurgeryClass,
      serviceItemListMap,
    }: any = this.props;
    const invoiceCurrency = invoiceItem?.invoiceCurrency;
    const serviceItemValue = form.getFieldValue('serviceItem');
    const isRequired = serviceItemValue === ServiceCode.code;
    const isServiceItem = isServiceItemRequired(serviceItemValue);
    const notRepeatableCodeList = getNotRepeatableCodes({
      repeatableServiceItemList,
      invoiceId,
      serviceItemListMap,
    });
    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
              disabledDictCodes={notRepeatableCodeList}
              required
              onSelectCallback={this.onSelect}
              searchName="serviceItem"
              formName="serviceItem"
              labelId="app.navigator.task-detail-of-data-capture.label.item"
              dropdownCode="claim_dict001"
              optionShowType="both"
              name="fieldOne"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="serviceItemDescription"
              labelId="serviceItemDescription"
              name="fieldOne"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              required
              currencyCode={invoiceCurrency}
              formName="expense"
              labelId="app.navigator.task-detail-of-data-capture.label.expense"
              hiddenPrefix
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              required={isServiceItem}
              formName="unit"
              labelId="app.navigator.task-detail-of-data-capture.label.unit"
              precision={0}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={dictsOfSurgeryClass}
              required={isRequired}
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
      </CardOfClaim>
    );
  }
}

export default ServiceListItem;
