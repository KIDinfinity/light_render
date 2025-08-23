import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

@connect(
  (
    { bpOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { serviceItemId }: any
  ) => ({
    serviceItem: bpOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'bpOfClaimAssessmentController/saveEntry',
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
          type: 'bpOfClaimAssessmentController/saveFormData',
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
      expensePerUnit: (value) => value,
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
      type: 'bpOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const { form, taskNotEditable }: any = this.props;

    return (
      <Form layout="vertical" style={{ width: '100%', padding: '5px 10px' }}>
        <FormLayout json={serviceItemLayout}>
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            required
            formName="expensePerUnit"
            labelId="app.navigator.task-detail-of-data-capture.label.expense-unit"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            required
            formName="unit"
            labelId="app.navigator.task-detail-of-data-capture.label.unit"
          />
          <FormItemNumber
            form={form}
            disabled
            required
            formName="expense"
            labelId="app.navigator.task-detail-of-data-capture.label.expense"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ServiceListItem;
