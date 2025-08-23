import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import { VLD_000272 } from 'claim/pages/validators/fieldValidators';
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
  validating: boolean;
}

@connect(
  (
    { daOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { serviceItemId, invoiceId }: any
  ) => {
    const treatmentId =
      daOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId]?.treatmentId;
    const treatmentItem =
      treatmentId && daOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId];
    return {
      serviceItem: daOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
      dateOfAdmission: treatmentItem.dateOfAdmission,
      dateOfDischarge: treatmentItem.dateOfDischarge,
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
    };
  }
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
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
          type: 'daOfClaimAssessmentController/saveFormData',
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

  componentWillUnmount = () => {
    this.unRegisterForm();
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

  handleDelete = () => {
    const { dispatch, invoiceId, serviceItemId }: any = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const {
      form,
      existServiceItems,
      taskNotEditable,
      dateOfAdmission,
      dateOfDischarge,
    }: any = this.props;
    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        cardStyle={{ paddingTop: 20 }}
        handleClick={this.handleDelete}
      >
        <Form layout="vertical">
          <FormLayout json={serviceItemLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={existServiceItems}
              required
              disabled={taskNotEditable}
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
              disabled={taskNotEditable}
              min={0}
              max={999999999.99}
              formName="expense"
              labelId="venus.claim.label-net-expense"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              rules={[
                {
                  validator: VLD_000272(
                    formUtils.queryValue(dateOfAdmission),
                    formUtils.queryValue(dateOfDischarge)
                  ),
                },
              ]}
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
