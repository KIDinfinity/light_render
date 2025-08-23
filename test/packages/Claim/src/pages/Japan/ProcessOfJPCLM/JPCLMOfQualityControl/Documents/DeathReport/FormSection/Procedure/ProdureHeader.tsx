import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import FormSection, { FormItemSelect, FormItemInput } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';

import Layout from './Layout';

interface IProps {
  form: any;
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  SurgeryType: any;
  ProcedureDetail: any;
  RemarkAvailable: any;
}

class ProdureHeader extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      SurgeryType,
      ProcedureDetail,
      RemarkAvailable,
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`ProdureHeader_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={Layout}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="procedureType"
          labelId="claim.procedure.procedureType"
          dicts={SurgeryType}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="procedureCategory"
          labelId="claim.procedure.procedureCategory"
          dicts={ProcedureDetail}
          mode="multiple"
          name="procedureCategory"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="remarkAvailable"
          labelId="claim.procedure.remarkAvailable"
          dicts={RemarkAvailable}
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="remark"
          maxLength={100}
          labelId="claim.procedure.remark"
          name="remark"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { dictionaryController, claimEditable, formCommonController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    SurgeryType: dictionaryController.SurgeryType,
    RemarkAvailable: dictionaryController.RemarkAvailable,
    ProcedureDetail: dictionaryController.ProcedureDetail,
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'diagnosisStartDate',
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
        remark: (value: string) => transRemarkCodeToMsg(value),
      });
    },
  })(ProdureHeader)
);
