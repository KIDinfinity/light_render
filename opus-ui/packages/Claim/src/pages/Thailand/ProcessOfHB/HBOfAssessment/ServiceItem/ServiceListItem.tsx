import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import type { IServiceItem } from '@/dtos/claim';
import { serviceItemLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  serviceItemId: string;
  invoiceId: string;
  serviceItem: IServiceItem;
  submited: boolean;
  existServiceItems: string[];
}

@connect(({ hbOfClaimAssessmentController }: any, { serviceItemId }: any) => ({
  serviceItem: hbOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId } = props;

    dispatch({
      type: 'hbOfClaimAssessmentController/saveServiceItem',
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
  handleDelete = () => {
    const { dispatch, invoiceId, serviceItemId }: any = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const { form, existServiceItems }: any = this.props;

    return (
      <CardOfClaim
        showButton={false}
        cardStyle={{ paddingTop: 20 }}
        handleClick={this.handleDelete}
      >
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={existServiceItems}
              required
              disabled
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
              disabled
              min={0}
              max={999999999.99}
              formName="expense"
              labelId="venus.claim.label-net-expense"
            />
            <FormItemNumber
              form={form}
              disabled
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
