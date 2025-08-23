import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemCheckbox,
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';
import {
  consultationDateLaterIncidentDate,
  consultationDateEarlierDeathDate,
  admissionDateLaterIncidentDate,
  admissionDateEarlierDeathDate,
  dischargeDateEarlierDeathDate,
  dischargeDateLaterAdmissionDate,
  fromIcuDateEarlierDischargeDate,
  fromIcuDateLaterAdmissionDate,
  toIcuDateEarlierDischargeDate,
  toIcuDateLaterFromIcuDate,
} from 'claimBasicProduct/pages/validators';
import type { IDictionary } from '@/dtos/dicts';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentDate: any;
  treatmentId: string;
  incidentId: string;
  dateTimeOfDeath: any;
}

@connect(
  (
    {
      dictionaryController,
      PHCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: PHCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    incidentDate: lodash.get(
      PHCLMOfClaimAssessmentController,
      `claimEntities.incidentListMap.${incidentId}.incidentDate`
    ),
    dateTimeOfDeath: lodash.get(
      PHCLMOfClaimAssessmentController,
      'claimProcessData.insured.dateTimeOfDeath'
    ),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating }: any = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentItem',
            payload: {
              changedFields: temChangedFields,
              incidentId,
              treatmentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentItem',
          payload: {
            changedFields: temChangedFields,
            incidentId,
            treatmentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { treatmentItem } = props;

    return formUtils.mapObjectToFields(treatmentItem, {
      treatmentType: (value: any) => value,
      dateOfConsultation: (value: any) => (value ? moment(value) : null),
      dateOfAdmission: (value: any) => (value ? moment(value) : null),
      dateOfDischarge: (value: any) => (value ? moment(value) : null),
      hospitalName: (value: any) => value,
      department: (value: any) => value,
      doctor: (value: any) => value,
      icu: (value: any) => value === 1,
      icuFromDate: (value: any) => (value ? moment(value) : null),
      icuToDate: (value: any) => (value ? moment(value) : null),
    });
  },
})
class TreatmentListItemOfBasicInfo extends PureComponent<IProps> {
  registeForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${treatmentId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${treatmentId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const {
      form,
      dictsOfTreatmentType,
      incidentDate,
      dateTimeOfDeath,
      taskNotEditable,
    } = this.props;
    const treatmentTypeValue = form.getFieldValue('treatmentType');
    const isTreatmentTypeOP = treatmentTypeValue === 'OP';
    const isTreatmentTypeIP = treatmentTypeValue === 'IP';
    const isICU = form.getFieldValue('icu');
    const incidentDateValue = formUtils.queryValue(incidentDate);
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
    const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
    const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
    const icuFromDateValue = form.getFieldValue('icuFromDate');

    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            formName="treatmentType"
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
            dicts={dictsOfTreatmentType}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeOP}
            required={isTreatmentTypeOP}
            formName="dateOfConsultation"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-consultation"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  consultationDateLaterIncidentDate(rule, value, callback, incidentDateValue),
              },
              {
                validator: (rule: any, value: any, callback: Function) =>
                  consultationDateEarlierDeathDate(rule, value, callback, dateTimeOfDeathValue),
              },
            ]}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeIP}
            required={isTreatmentTypeIP}
            formName="dateOfAdmission"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  admissionDateLaterIncidentDate(rule, value, callback, incidentDateValue),
              },
              {
                validator: (rule: any, value: any, callback: Function) =>
                  admissionDateEarlierDeathDate(rule, value, callback, dateTimeOfDeathValue),
              },
            ]}
            partner="dateOfDischarge"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeIP}
            required={isTreatmentTypeIP}
            formName="dateOfDischarge"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  dischargeDateEarlierDeathDate(rule, value, callback, dateTimeOfDeathValue),
              },
              {
                validator: (rule: any, value: any, callback: Function) =>
                  dischargeDateLaterAdmissionDate(rule, value, callback, dateOfAdmissionValue),
              },
            ]}
            partner="dateOfAdmission"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            maxLength={60}
            formName="hospitalName"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            name="fieldTwo"
          />
          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable}
            dropdownCode="misc_dict006"
            optionShowType="both"
            searchName="dictionary"
            formName="department"
            labelId="app.navigator.task-detail-of-data-capture.label.department-of-treatment"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="doctor"
            maxLength={60}
            labelId="app.navigator.task-detail-of-data-capture.label.name-of-doctor"
            rules={[
              {
                max: 60,
                message: 'Doctor length no more than 60',
              },
            ]}
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeIP}
            formName="icu"
            labelId="app.navigator.task-detail-of-data-capture.label.intensive-care-unit"
            name="fieldTwo"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeIP}
            required={isICU}
            formName="icuFromDate"
            labelId="app.navigator.task-detail-of-data-capture.label.form-date"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  fromIcuDateEarlierDischargeDate(rule, value, callback, dateOfDischargeValue),
              },
              {
                validator: (rule: any, value: any, callback: Function) =>
                  fromIcuDateLaterAdmissionDate(rule, value, callback, dateOfAdmissionValue),
              },
            ]}
            partner="icuToDate"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isTreatmentTypeIP}
            required={isICU}
            formName="icuToDate"
            labelId="app.navigator.task-detail-of-data-capture.label.to-date"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  toIcuDateEarlierDischargeDate(rule, value, callback, dateOfDischargeValue),
              },
              {
                validator: (rule: any, value: any, callback: Function) =>
                  toIcuDateLaterFromIcuDate(rule, value, callback, icuFromDateValue),
              },
            ]}
            partner="icuFromDate"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
