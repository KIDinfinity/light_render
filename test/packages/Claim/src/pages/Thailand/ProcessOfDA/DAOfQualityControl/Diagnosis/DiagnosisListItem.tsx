import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';

import { diagnosisLayout, diagnosisExpendLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'diagnosisListItem';

@connect(
  (
    {
      daOfClaimCaseController,
      dictionaryController,
      loading,
      formCommonController,
      claimEditable,
    }: any,
    { diagnosisId }: any
  ) => ({
    diagnosisItem: daOfClaimCaseController.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'daOfClaimCaseController/saveEntry',
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
          type: 'daOfClaimCaseController/saveFormData',
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
      criticalIllness: (value: any) => value === 1 || value === true, // 这里前后端不能统一用true/false吗，前端用true/false，后台用1/0。这样不行
      diagnosisCode: (value: any) => value,
    });
  },
})
class DiagnosisListItem extends Component {
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
      type: 'daOfClaimCaseController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  searchIsCIByDiagnosisCode = (value) => {
    const { dispatch, diagnosisId, incidentId }: any = this.props;
    dispatch({
      type: 'daOfClaimCaseController/checkIsCIByDiagnosisCode',
      payload: {
        diagnosisId,
        incidentId,
        searchCode: value,
      },
    });
    dispatch({
      type: 'daOfClaimCaseController/retrieve3CiIndicator',
      payload: {
        diagnosisId,
        diagnosisCode: value,
      },
    });
    dispatch({
      type: 'daOfClaimCaseController/getSimpleDiseaseFlagByDiagonosis',
      payload: {
        diagnosisId,
        incidentId,
        diagonosisCode: value,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfDiagnosisType,
      loadingOfFindDictionary,
      hasTreatment,
      existDiagnosisCode,
      taskNotEditable,
    }: any = this.props;

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
              disabledDictCodes={existDiagnosisCode}
              required
              searchName="diagnosis"
              formName="diagnosisCode"
              name="fieldTwo"
              labelId="app.navigator.task-detail-of-data-capture.label.icd10-code-name"
              dropdownCode="claim_dict004"
              onSelectCallback={this.searchIsCIByDiagnosisCode}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              name="criticalIllness"
              formName="diagnosisType"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-type"
              dicts={dictsOfDiagnosisType}
              loading={loadingOfFindDictionary}
            />
            <FormItemCheckbox
              form={form}
              disabled={taskNotEditable}
              name="criticalIllness"
              formName="criticalIllness"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-indicator"
            />
            <FormItemCheckbox form={form} disabled formName="ci3" labelId="3CI" name="ci3" />
            <FormItemCheckbox
              form={form}
              disabled
              formName="simpleDisease"
              labelId="app.navigator.task-detail-of-data-capture.label.simple-disease"
              name="criticalIllness"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
