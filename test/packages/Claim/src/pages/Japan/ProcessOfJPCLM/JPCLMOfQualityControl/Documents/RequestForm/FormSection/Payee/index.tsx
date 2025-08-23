import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import PayType from './PayType';
import Layout from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  claimant: any;
  loadingOfFindDictionary: boolean;
  formData: any;
  documentId: string;
  PaymentMethod: IDictionary[];
  FinInstCategory: IDictionary[];
  PaymentMBranchCategoryethod_jp: IDictionary[];
  Account: IDictionary[];
  taskNotEditable: boolean;
}

class Payee extends Component<IProps> {
  render() {
    const {
      form,
      loadingOfFindDictionary,
      PaymentMethod = [],
      taskNotEditable,
      documentId,
    } = this.props;

    const paymentMethod = form.getFieldValue('paymentMethod');
    const PayForm = PayType(paymentMethod, {
      form,
      ...this.props,
    });
    return (
      <FormSection
        form={form}
        formId={`Payee_${documentId}`}
        layout={Layout}
        title="venus_claim.label.paymentMethod.payee"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          required
          formName="paymentMethod"
          labelId="venus_claim.label.paymentMethod"
          dicts={PaymentMethod}
          loading={loadingOfFindDictionary}
        />
        {PayForm}
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController, dictionaryController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    PaymentMethod: dictionaryController.PaymentMethod,
    FinInstCategory: dictionaryController.FinInstCategory,
    BranchCategory: dictionaryController.BranchCategory,
    Account: dictionaryController.Account,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, []);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormData',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormData',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;
      return formUtils.mapObjectToFields(formData);
    },
  })(Payee)
);
