import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemSelectPlus,
  FormItemCheckbox,
  FormItemDatePicker,
  formUtils,
} from 'basic/components/Form';
import { diagnosisLayout, diagnosisExpendLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'diagnosisListItem';

@connect(
  (
    { JPCLMProcessCreate, dictionaryController, formCommonController }: any,
    { diagnosisId }: any
  ) => ({
    diagnosisItem: JPCLMProcessCreate.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType,
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, diagnosisId, validating }: any = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'JPCLMProcessCreate/saveDiagnosisItem',
      payload: {
        changedFields,
        diagnosisId,
      },
    });
  },
  mapPropsToFields(props) {
    const { diagnosisItem } = props;

    return formUtils.mapObjectToFields(diagnosisItem, {
      diagnosisDescription: (value) => value,
      firstSymptomDate: (value) => value,
      symptomDate: (value) => value,
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
      type: 'JPCLMProcessCreate/removeDiagnosisItem',
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
    } = this.props;
    const isCINameRequired =
      diagnosisItem && formUtils.queryValue(diagnosisItem.criticalIllness) === 1;

    return (
      <CardOfClaim showButton handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={existDiagnosisCode}
              required
              searchName="diagnosis"
              dropdownCode="claim_dict004"
              optionShowType="both"
              formName="diagnosisCode"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code-name"
              name="fieldTwo"
            />
            <FormItemInput
              form={form}
              formName="diagnosisDescription"
              labelId="DiagnosisDescription"
              name="fieldTwo"
            />
            <FormItemSelect
              form={form}
              required
              dicts={dictsOfDiagnosisType}
              formName="diagnosisType"
              labelId="app.navigator.JPCA-of-manual-assessment.label.diagnosis-type"
            />
            <FormItemCheckbox
              form={form}
              formName="criticalIllness"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-indicator"
            />
            <FormItemInput
              form={form}
              disabled={!isCINameRequired}
              required={isCINameRequired}
              maxLength={100}
              formName="criticalIllnessName"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-name"
              name="fieldTwo"
            />
            <FormItemDatePicker
              form={form}
              formName="firstSymptomDate"
              labelId="FirstSymptomDate"
            />
            <FormItemDatePicker form={form} formName="symptomDate" labelId="SymptomDate" />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
