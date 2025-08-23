import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

@connect(
  ({ JPCLMProcessCreate, formCommonController, claimEditable }: any, { serviceItemId }: any) => ({
    serviceItem: JPCLMProcessCreate.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'JPCLMProcessCreate/saveServiceItem',
      payload: {
        changedFields,
        serviceItemId,
        invoiceId,
      },
    });
  },
  mapPropsToFields(props) {
    const { serviceItem } = props;

    return formUtils.mapObjectToFields(serviceItem, {
      serviceItem: (value) => value,
      unit: (value) => value,
      expense: (value) => value,
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
      type: 'JPCLMProcessCreate/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const { form, existServiceItems }: any = this.props;

    return (
      <CardOfClaim showButton handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={existServiceItems}
              required
              searchName="serviceItem"
              formName="serviceItem"
              labelId="app.navigator.task-detail-of-data-capture.label.item"
              dropdownCode="claim_dict001"
              optionShowType="both"
              name="fieldOne"
            />
            <FormItemNumber
              form={form}
              required
              formName="expense"
              labelId="app.navigator.task-detail-of-data-capture.label.expense"
            />
            <FormItemNumber
              form={form}
              formName="unit"
              labelId="app.navigator.task-detail-of-data-capture.label.unit"
              precision={0}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ServiceListItem;
