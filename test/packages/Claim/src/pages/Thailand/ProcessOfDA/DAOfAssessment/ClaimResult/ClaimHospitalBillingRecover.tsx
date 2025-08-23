import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { AssessmentResultLayout } from '../FormLayout.json';

const FORMID = 'claimHospitalBillingRecover';

// @ts-ignore,
@connect(({ daOfClaimAssessmentController, formCommonController, claimEditable }: any) => ({
  claimHospitalBillingRecover: lodash.get(
    daOfClaimAssessmentController,
    'claimProcessData.claimHospitalBillingRecover'
  ),
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
}))
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveClaimHospitalBillingRecover',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveClaimHospitalBillingRecover',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimHospitalBillingRecover }: any = props;

    return formUtils.mapObjectToFields(claimHospitalBillingRecover, {
      hospitalBillAmount: (value: any) => value,
      recoverFromCustomer: (value: any) => value,
    });
  },
})
class ClaimHospitalBillingRecover extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, taskNotEditable }: any = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={AssessmentResultLayout}>
          <FormItemNumber
            form={form}
            disabled
            min={0}
            max={999999999.99}
            formName="hospitalBillAmount"
            labelId="venus-claim-label-hospitalBillAmount"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            min={0}
            max={999999999.99}
            formName="recoverFromCustomer"
            labelId="venus-claim-label-recoverFromCustomer"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimHospitalBillingRecover;
