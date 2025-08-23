import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemSelect,
  FormItemSelectPlus,
  FormItemCheckbox,
  formUtils,
} from 'basic/components/Form';
import { diagnosisLayout, diagnosisExpendLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'diagnosisListItem';

@connect(
  (
    {
      PHCLMOfDataCaptureController,
      dictionaryController,
      formCommonController,
      claimEditable,
    }: any,
    { diagnosisId }: any
  ) => ({
    diagnosisItem: PHCLMOfDataCaptureController.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfDropdownCLMCriticalIllness: dictionaryController.Dropdown_CLM_CriticalIllness,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, diagnosisId, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfDataCaptureController/saveEntry',
            target: 'saveDiagnosisItem',
            payload: {
              changedFields,
              incidentId,
              diagnosisId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfDataCaptureController/saveFormData',
          target: 'saveDiagnosisItem',
          payload: {
            changedFields,
            incidentId,
            diagnosisId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { diagnosisItem } = props;

    return formUtils.mapObjectToFields(diagnosisItem, {
      diagnosisType: (value) => value,
      diagnosticPathology: (value) => value === 1 || value === true, // 这里前后端不能统一用true/false吗，前端用true/false，后台用1/0。这样不行
      diagnosisDate: (value) => (value ? moment(value) : null),
      dateOfOnset: (value) => (value ? moment(value) : null),
    });
  },
})
class DiagnosisListItem extends PureComponent {
  registeForm = () => {
    const { dispatch, form, diagnosisId } = this.props;

    if (diagnosisId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${diagnosisId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, diagnosisId } = this.props;

    if (diagnosisId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${diagnosisId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, incidentId, diagnosisId } = this.props;

    dispatch({
      type: 'PHCLMOfDataCaptureController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfDiagnosisType,
      diagnosisItem,
      hasTreatment,
      existDiagnosisCode,
      taskNotEditable,
      dictsOfDropdownCLMCriticalIllness,
    } = this.props;
    const isCINameRequired =
      diagnosisItem && formUtils.queryValue(diagnosisItem.criticalIllness) === 1;

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
              disabledDictCodes={existDiagnosisCode}
              searchName="diagnosis"
              dropdownCode="claim_dict004"
              optionShowType="both"
              formName="diagnosisCode"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code-name"
              name="fieldTwo"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={dictsOfDiagnosisType}
              formName="diagnosisType"
              labelId="app.navigator.JPCA-of-manual-assessment.label.diagnosis-type"
            />
            <FormItemCheckbox
              form={form}
              disabled={taskNotEditable}
              formName="criticalIllness"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-indicator"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || !isCINameRequired}
              required={isCINameRequired}
              dicts={dictsOfDropdownCLMCriticalIllness}
              formName="criticalIllnessName"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-name"
              name="fieldTwo"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
