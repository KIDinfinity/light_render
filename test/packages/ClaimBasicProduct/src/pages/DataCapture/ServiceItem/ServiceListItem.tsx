import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

@connect(
  (
    { bpOfDataCaptureController, formCommonController, claimEditable }: any,
    { serviceItemId }: any
  ) => ({
    serviceItem: bpOfDataCaptureController.claimEntities.serviceItemListMap[serviceItemId],
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
            type: 'bpOfDataCaptureController/saveEntry',
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
          type: 'bpOfDataCaptureController/saveFormData',
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
      serviceItem: (value) => value,
      expensePerUnit: (value) => value,
      unit: (value) => value,
      expense: (value) => value,
    });
  },
})
class ServiceListItem extends PureComponent {
  sectionRef = React.createRef();

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
    deleteWarning({
      sectionRef: this.sectionRef,
      sectionID: SectionID.Service,
    }).then(() => {
      dispatch({
        type: 'bpOfDataCaptureController/removeServiceItem',
        payload: {
          invoiceId,
          serviceItemId,
        },
      });
    });
  };

  render() {
    const { form, existServiceItems, taskNotEditable }: any = this.props;

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        ref={this.sectionRef}
      >
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
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
      </CardOfClaim>
    );
  }
}

export default ServiceListItem;
