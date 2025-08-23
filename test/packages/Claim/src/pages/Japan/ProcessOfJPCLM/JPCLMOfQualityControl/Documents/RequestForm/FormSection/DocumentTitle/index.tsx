import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormItemInput, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { VLD_000259 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { documentUtils } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Utils';
import moment from 'moment';

import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  dictsOfGender: any;
}

class DocumentTitle extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId, bpoFormDataList } = this.props;
    const insuredNameList = documentUtils.getNameArray(bpoFormDataList, documentId);
    return (
      <FormSection
        form={form}
        formId={`DocumentTitle_${documentId}`}
        layout={Layout}
        isHideBgColor
        isMargin={false}
        isPadding={false}
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="insuredName"
          rules={[
            {
              validator: VLD_000259({ checkValue: insuredNameList }),
            },
          ]}
          maxLength={30}
          labelId="venus_claim.label.insuredName"
        />
        {/* 請求書受付日：单份请求书的 “書類到着日”、“代理店受付日” 和 “営業店受付日” 中最早的日期 */}
        <FormItemDatePicker
          form={form}
          disabled
          formName="applicationFromArrivalDate"
          labelId="venus_claim.label.formArrivalDate"
          format="L"
        />
        {/* 書類到着日 */}
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="receivedDate"
          required
          labelId="venus_claim.label.receivedDate"
          format="L"
        />
        {/* 代理店受付日 */}
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="agencyAcceptanceDate"
          labelId="venus_claim.label.agencyAcceptanceDate"
          format="L"
        />
        {/* 営業店受付日 */}
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="counterAcceptanceSign"
          labelId="venus_claim.label.counterAcceptanceSignDate"
          format="L"
        />
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
    bpoFormDataList: JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList,
    dictsOfGender: dictionaryController.Gender,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      // @ts-ignore
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'receivedDate',
        'counterAcceptanceSign',
        'agencyAcceptanceDate',
        'applicationFromArrivalDate',
      ]);
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
      return formUtils.mapObjectToFields(formData, {
        // @ts-ignore
        applicationFromArrivalDate: (value: any) => (value ? moment(value) : null),
        receivedDate: (value: any) => (value ? moment(value) : null),
        agencyAcceptanceDate: (value: any) => (value ? moment(value) : null),
        counterAcceptanceSign: (value: any) => (value ? moment(value) : null),
      });
    },
  })(DocumentTitle)
);
