import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { serviceItemLayout } from '../FormLayout.json';
import type { IServiceItem } from '@/dtos/claim';

const FORMID_PREFIX = 'ServiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  serviceItemId: string;
  invoiceId: string;
  serviceItem: IServiceItem;
  submited: boolean;
  existServiceItems: string[];
  validating: boolean;
}

@connect(({ daProcessController, formCommonController }: any, { serviceItemId }: any) => ({
  serviceItem: daProcessController.claimEntities.serviceItemListMap[serviceItemId],
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'daProcessController/saveServiceItem',
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
      serviceItem: (value: any) => value,
      unit: (value: any) => value,
      expense: (value: any) => value,
    });
  },
})
class ServiceListItem extends Component {
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
      type: 'daProcessController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const { form, existServiceItems }: any = this.props;

    return (
      <CardOfClaim cardStyle={{ paddingTop: 20 }} showButton handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={existServiceItems}
              required
              formName="serviceItem"
              searchName="serviceItem"
              name="serviceItem"
              labelId="app.navigator.task-detail-of-data-capture.label.item"
              dropdownCode="claim_dict001"
              optionShowType="both"
            />
            <FormItemNumber
              form={form}
              required
              min={0}
              max={999999999.99}
              formName="expense"
              labelId="venus.claim.label-net-expense"
            />
            <FormItemNumber
              form={form}
              precision={0}
              min={0}
              max={999999999}
              formName="unit"
              name="unit"
              labelId="app.navigator.task-detail-of-data-capture.label.unit"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ServiceListItem;
