/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { VLD_000009 } from 'claim/pages/validators/fieldValidators';
import json from '../FormLayout.json';
import { findFieldWarning } from '@/utils/medicalSearch';

const FORMID_PREFIX = 'diagnosisListItem';
const VALIDATE_FIELDS = ['diagnosisName', 'diagnosisCode', 'diagnosisNo'];

@connect(
  (
    {
      JPCLMOfClaimAssessmentController,
      dictionaryController,
      formCommonController,
      claimEditable,
      medicalValidate,
    },
    { diagnosisId }
  ) => ({
    diagnosisItem: JPCLMOfClaimAssessmentController.claimEntities.diagnosisListMap[diagnosisId],
    dictsOfDiagnosisType: dictionaryController.DiagnosisType,
    dictsOfHistoExam: dictionaryController.HistoExam,
    dictsOfMalignantNeoplasmType: dictionaryController.MalignantNeoplasmType,
    dictsOfDepthOfColorectalCancer: dictionaryController.DepthColorectalCancer,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    warningList: medicalValidate.validateResult[`${FORMID_PREFIX}_${diagnosisId}`],
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, diagnosisId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
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
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
      diagnosisType: (value) => (value === null ? [] : value),
      diagnosticPathology: (value) => value, // 这里前后端不能统一用true/false吗，前端用true/false，后台用1/0。这样不行
      determinationDate: (value) => (value ? moment(value) : null),
      dateOfOnset: (value) => (value ? moment(value) : null),
      firstDeterminationDate: (value) => (value ? moment(value) : null),
    });
  },
})
class DiagnosisListItem extends PureComponent {
  static contextTypes = {
    isValidateWarning: PropTypes.bool,
  };

  registeForm = () => {
    const { dispatch, form, diagnosisId } = this.props;

    if (diagnosisId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${diagnosisId}`,
            },
          },
          0
        );
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
    const { diagnosisItem, dispatch, diagnosisId, incidentId } = this.props;
    if (this.isValidate) {
      dispatch({
        type: 'medicalValidate/validateRequest',
        payload: {
          preItem: {},
          item: diagnosisItem,
          fields: VALIDATE_FIELDS,
          objectType: 0,
          key: `${FORMID_PREFIX}_${diagnosisId}`,
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetDiagnosisListItemFieldsValue',
          changeFormParams: {
            incidentId,
            diagnosisId,
          },
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, diagnosisId } = this.props;

    if (diagnosisId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${diagnosisId}`,
            },
          },
          0
        );
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  get isValidate() {
    return this?.context?.isValidateWarning;
  }

  handleDelete = () => {
    const { dispatch, incidentId, diagnosisId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  getExistDiagnosisCode = () => {
    const { diagnosisId, existDiagnosisList } = this.props;

    const existDiagnosisCode = [];
    lodash.map(existDiagnosisList, (item) => {
      if (lodash.isPlainObject(item) && item.id !== diagnosisId && item.diagnosisCode) {
        existDiagnosisCode.push(item.diagnosisCode);
      }
    });

    return existDiagnosisCode;
  };

  handleBlur = () => {
    const { diagnosisItem, dispatch, incidentId, diagnosisId } = this.props;
    if (this.isValidate) {
      dispatch({
        type: 'medicalValidate/updateValues',
        payload: {
          preItem: {},
          item: diagnosisItem,
          fields: VALIDATE_FIELDS,
          objectType: 0,
          key: `${FORMID_PREFIX}_${diagnosisId}`,
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetDiagnosisListItemFieldsValue',
          changeFormParams: {
            incidentId,
            diagnosisId,
          },
        },
      });
    }
  };

  render() {
    const {
      form,
      dictsOfDiagnosisType,
      diagnosisTypeSelectMain,
      dictsOfHistoExam,
      diagnosisId,
      dictsOfMalignantNeoplasmType,
      dictsOfDepthOfColorectalCancer,
      taskNotEditable,
      diagnosisItem,
      warningList,
    } = this.props;
    const existDiagnosisCode = this.getExistDiagnosisCode();
    const diagnosisTypeP = form.getFieldValue('diagnosisType') === 'P';
    const VLD000086 = form.getFieldValue('diagnosticPathology') === '01';

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="diagnosisName"
              maxLength={100}
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-name"
              warningMessage={findFieldWarning({
                list: warningList,
                id: diagnosisItem?.id,
                fieldCode: 'diagnosisName',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="stdDiagnosisName"
              maxLength={20}
              labelId="app.navigator.JPCA-of-manual-assessment.label.standard-diagnosis-name"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="diagnosisCode"
              rules={[
                {
                  validator: VLD_000009(existDiagnosisCode),
                },
              ]}
              maxLength={20}
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code"
              warningMessage={findFieldWarning({
                list: warningList,
                id: diagnosisItem?.id,
                fieldCode: 'diagnosisCode',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="diagnosisNo"
              maxLength={20}
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-no"
              warningMessage={findFieldWarning({
                list: warningList,
                id: diagnosisItem?.id,
                fieldCode: 'diagnosisNo',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              dicts={
                diagnosisTypeSelectMain && diagnosisTypeSelectMain !== diagnosisId
                  ? lodash.filter(dictsOfDiagnosisType, (value) => value.dictCode !== 'P')
                  : dictsOfDiagnosisType
              }
              formName="diagnosisType"
              labelId="app.navigator.JPCA-of-manual-assessment.label.diagnosis-type"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable || form.getFieldValue('diagnosisType') === 'C'}
              formName="dateOfOnset"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-onset"
            />
            {diagnosisTypeP && (
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                dicts={dictsOfHistoExam}
                formName="diagnosticPathology"
                labelId="app.navigator.task-detail-of-data-capture.label.diagnostic-pathology"
              />
            )}
            {diagnosisTypeP && (
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable || !VLD000086}
                formName="determinationDate"
                labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-date"
              />
            )}
            {diagnosisTypeP && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !VLD000086}
                maxLength={100}
                formName="pathologicalName"
                labelId="app.navigator.task-detail-of-data-capture.label.pathological-name"
              />
            )}

            {diagnosisTypeP && (
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                dicts={dictsOfMalignantNeoplasmType}
                formName="malignantNeoplasmType"
                labelId="venus-claim-label-malignantNeoplasmType"
              />
            )}
            {diagnosisTypeP && (
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                dicts={dictsOfDepthOfColorectalCancer}
                formName="depthOfColorectalCancer"
                labelId="venus-claim-label-depthOfColorectalCancer"
              />
            )}
            {diagnosisTypeP && (
              <FormItemDatePicker
                form={form}
                disabled={taskNotEditable}
                formName="firstDeterminationDate"
                labelId="venus-claim-label-firstDeterminationDate"
              />
            )}
            {diagnosisTypeP && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="firstPathologicalName"
                labelId="venus.claim.label.first-diagnosis-name"
              />
            )}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
