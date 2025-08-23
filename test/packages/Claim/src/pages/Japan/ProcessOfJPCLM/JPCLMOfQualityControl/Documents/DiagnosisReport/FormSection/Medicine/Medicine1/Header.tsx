import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  CancerFlagIII: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class Header extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId, CancerFlagIII } = this.props;
    return (
      <FormSection
        form={form}
        formId={`MedicineHeader1_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cancerMedicine"
          dicts={CancerFlagIII}
          labelId="claim.medicine.cancerMedicine"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { claimEditable, formCommonController, dictionaryController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    CancerFlagIII: dictionaryController.CancerFlagIII,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create<IProps>({
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
  })(Header)
);
