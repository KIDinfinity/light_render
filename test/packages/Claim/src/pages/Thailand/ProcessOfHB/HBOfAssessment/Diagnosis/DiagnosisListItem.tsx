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
    { hbOfClaimAssessmentController, dictionaryController, loading }: any,
    { diagnosisId }: any
  ) => ({
    diagnosisItem: hbOfClaimAssessmentController.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType || [],
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, diagnosisId }: any = props;

    dispatch({
      type: 'hbOfClaimAssessmentController/saveDiagnosisItem',
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
      criticalIllness: (value: any) => value === 1 || value === true, // 这里前后端不能统一用true/false吗，前端用true/false，后台用1/0。这样不行
      diagnosisCode: (value: any) => value,
    });
  },
})
class DiagnosisListItem extends Component {
  handleDelete = () => {
    const { dispatch, incidentId, diagnosisId }: any = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  searchIsCIByDiagnosisCode = (value) => {
    const { dispatch, diagnosisId, incidentId }: any = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/checkIsCIByDiagnosisCode',
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
      loadingOfFindDictionary,
      hasTreatment,
      existDiagnosisCodes,
    }: any = this.props;

    return (
      <CardOfClaim showButton={false} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={hasTreatment ? diagnosisLayout : diagnosisExpendLayout}>
            <FormItemSelectPlus
              form={form}
              disabled
              disabledDictCodes={existDiagnosisCodes}
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
              disabled
              required
              formName="diagnosisType"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-type"
              dicts={dictsOfDiagnosisType}
              loading={loadingOfFindDictionary}
            />
            <FormItemCheckbox
              form={form}
              disabled
              formName="criticalIllness"
              labelId="app.navigator.task-detail-of-data-capture.label.critical-illness-indicator"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
