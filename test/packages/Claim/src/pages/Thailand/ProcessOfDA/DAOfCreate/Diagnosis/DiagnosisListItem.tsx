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
    { daProcessController, dictionaryController, loading, formCommonController }: any,
    { diagnosisId }: any
  ) => ({
    diagnosisItem: daProcessController.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, diagnosisId, validating }: any = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'daProcessController/saveDiagnosisItem',
      payload: {
        changedFields,
        incidentId,
        diagnosisId,
      },
    });
  },
  mapPropsToFields(props) {
    const { diagnosisItem }: any = props;

    return formUtils.mapObjectToFields(diagnosisItem, {
      diagnosisType: (value: any) => value,
      criticalIllness: (value: any) => value,
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
      type: 'daProcessController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  searchIsCIByDiagnosisCode = (value) => {
    const { dispatch, diagnosisId, incidentId }: any = this.props;
    dispatch({
      type: 'daProcessController/checkIsCIByDiagnosisCode',
      payload: {
        diagnosisId,
        incidentId,
        searchCode: value,
      },
    });
    dispatch({
      type: 'daProcessController/getSimpleDiseaseFlagByDiagonosis',
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
    }: any = this.props;

    return (
      <CardOfClaim showButton handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
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
              required
              formName="diagnosisType"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-type"
              dicts={dictsOfDiagnosisType}
              loading={loadingOfFindDictionary}
              name="criticalIllness"
            />
            <FormItemCheckbox
              form={form}
              formName="criticalIllness"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-indicator"
              name="criticalIllness"
            />
            <FormItemCheckbox
              form={form}
              disabled
              formName="simpleDisease"
              labelId="app.navigator.task-detail-of-data-capture.label.simple-disease"
              name="simpleDisease"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
