import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';

import { withContextData } from '@/components/_store';
import { diagnosisLayout, diagnosisExpendLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'diagnosisListItem';

@connect(
  (
    { PHCLMOfAppealCaseController, dictionaryController, formCommonController, claimEditable }: any,
    { diagnosisId, withData: { caseType } }: any
  ) => ({
    diagnosisItem: caseType
      ? PHCLMOfAppealCaseController[caseType].claimEntities.diagnosisListMap[diagnosisId]
      : PHCLMOfAppealCaseController.claimEntities.diagnosisListMap[diagnosisId],
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
            type: 'PHCLMOfAppealCaseController/saveEntry',
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
          type: 'PHCLMOfAppealCaseController/saveFormData',
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
    const { diagnosisItem }: any = props;

    return formUtils.mapObjectToFields(diagnosisItem, {
      diagnosisType: (value: any) => value,
      diagnosticPathology: (value: any) => value === 1 || value === true, // 这里前后端不能统一用true/false吗，前端用true/false，后台用1/0。这样不行
      diagnosisDate: (value: any) => (value ? moment(value) : null),
      dateOfOnset: (value: any) => (value ? moment(value) : null),
    });
  },
})
class DiagnosisListItem extends PureComponent {
  registeForm = () => {
    const { dispatch, form, diagnosisId }: any = this.props;

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
    const { dispatch, form, diagnosisId }: any = this.props;

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
    const { dispatch, incidentId, diagnosisId }: any = this.props;

    dispatch({
      type: 'PHCLMOfAppealCaseController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  searchIsCIByDiagnosisCode = (value) => {
    const { dispatch, diagnosisId, incidentId }: any = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/checkIsCIByDiagnosisCode',
      payload: {
        diagnosisId,
        incidentId,
        searchCode: value,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfDiagnosisType,
      diagnosisItem,
      hasTreatment,
      taskNotEditable: notEditable,
      withData,
      dictsOfDropdownCLMCriticalIllness,
    }: any = this.props;
    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    const isCINameRequired =
      diagnosisItem && formUtils.queryValue(diagnosisItem.criticalIllness) === 1;

    return (
      <CardOfClaim>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
              searchName="diagnosis"
              dropdownCode="claim_dict004"
              optionShowType="both"
              formName="diagnosisCode"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code-name"
              name="fieldTwo"
              onSelectCallback={this.searchIsCIByDiagnosisCode}
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

export default withContextData(DiagnosisListItem);
