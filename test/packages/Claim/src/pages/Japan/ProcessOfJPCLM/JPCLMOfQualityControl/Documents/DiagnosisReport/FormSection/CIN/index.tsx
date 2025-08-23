import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';

import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import moment from 'moment';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  claimant: any;
  documentId: any;
  treatmentId: any;
  formData: any;
  CervicalCancerCin: any;
  CancerFlagIV: any;
  taskNotEditable: boolean;
}

class CIN extends Component<IProps> {
  render() {
    const { form, CervicalCancerCin, CancerFlagIV, taskNotEditable, documentId } = this.props;

    const cervicalCancerDateRequire = !lodash.isEmpty(form.getFieldValue('cervicalCancerCIN'));
    return (
      <FormSection
        form={form}
        formId={`CIN_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.cervicalIntraepithelialNeoplasia"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cancerFlag4th"
          dicts={CancerFlagIV}
          labelId="venus_claim.label.cancerFlag4th"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cervicalCancerCIN"
          dicts={CervicalCancerCin}
          labelId="venus_claim.label.cervicalCancerCIN"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required={cervicalCancerDateRequire}
          formName="cervicalCancerDate"
          labelId="venus_claim.label.cervicalCancerDate"
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
    CervicalCancerCin: dictionaryController.CervicalCancerCin,
    CancerFlagIV: dictionaryController.CancerFlagIV,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'cervicalCancerDate',
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
        cancerFlag4th: (value: any) => value,
        cervicalCancerCIN: (value: any) => value,
        cervicalCancerDate: (value: string | object) => (value ? moment(value) : null),
      });
    },
  })(CIN)
);
