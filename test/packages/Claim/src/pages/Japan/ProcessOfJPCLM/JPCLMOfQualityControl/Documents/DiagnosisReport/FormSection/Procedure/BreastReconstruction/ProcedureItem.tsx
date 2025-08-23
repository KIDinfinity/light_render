import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';

import { Form } from 'antd';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import { VLD_000211 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  SideforBreastReconstruction: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class ProcedureItem3 extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      SideforBreastReconstruction,
      breastReconstruction,
      formData: { id },
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`ProcedureItem3_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemSelect
          form={form}
          required={VLD_000211({ checkValue: breastReconstruction })}
          disabled={taskNotEditable}
          dicts={SideforBreastReconstruction}
          formName="bodyPartOfBreastReconstruction"
          labelId="claim.procedure.breastSideForReconstruction"
        />
        <FormItemDatePicker
          form={form}
          required={VLD_000211({ checkValue: breastReconstruction })}
          disabled={taskNotEditable}
          formName="dateOfBreastReconstruction"
          labelId="claim.procedure.dateOfBreastReconstruction"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { claimEditable, formCommonController, dictionaryController, JPCLMOfQualityController }: any,
    { documentId }
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    SideforBreastReconstruction: dictionaryController.SideforBreastReconstruction,
    breastReconstruction: formUtils.queryValue(
      lodash.get(
        JPCLMOfQualityController,
        `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.breastReconstruction`,
        ''
      )
    ),
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfBreastReconstruction',
      ]);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormDataItem',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
                id: formData.id,
                keyName,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormDataItem',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
              id: formData.id,
              keyName,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;
      return formUtils.mapObjectToFields(formData, {
        breastSideForReconstruction: (value: any) => value,
        dateOfBreastReconstruction: (value: any) => (value ? moment(value) : null),
      });
    },
  })(ProcedureItem3)
);
