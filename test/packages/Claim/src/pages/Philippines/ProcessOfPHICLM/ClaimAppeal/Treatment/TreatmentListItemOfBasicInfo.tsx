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
import { withContextData } from '@/components/_store';
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
    { dictionaryController, PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
    { treatmentId, incidentId, withData: { caseType } }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: caseType
      ? PHCLMOfAppealCaseController[caseType].claimEntities.treatmentListMap[treatmentId]
      : PHCLMOfAppealCaseController.claimEntities.treatmentListMap[treatmentId],
    incidentDate: caseType
      ? lodash.get(
          PHCLMOfAppealCaseController,
          `${caseType}.claimEntities.incidentListMap.${incidentId}.incidentDate`
        )
      : lodash.get(
          PHCLMOfAppealCaseController,
          `claimEntities.incidentListMap.${incidentId}.incidentDate`
        ),
    dateTimeOfDeath: caseType
      ? lodash.get(
          PHCLMOfAppealCaseController,
          `${caseType}.claimProcessData.insured.dateTimeOfDeath`
        )
      : lodash.get(PHCLMOfAppealCaseController, 'claimProcessData.insured.dateTimeOfDeath'),
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
            type: 'PHCLMOfAppealCaseController/saveEntry',
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
          type: 'PHCLMOfAppealCaseController/saveFormData',
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
      taskNotEditable: notEditable,
      withData,
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
    const { appealNotEditable, caseType }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

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
          />
        </FormLayout>
      </Form>
    );
  }
}

export default withContextData(TreatmentListItemOfBasicInfo);
