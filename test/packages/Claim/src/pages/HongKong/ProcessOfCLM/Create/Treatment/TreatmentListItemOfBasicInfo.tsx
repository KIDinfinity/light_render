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
import type { IIncident, IInsured } from '@/dtos/claim';
import { ClaimType } from 'claim/enum';

import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentItem: IIncident;
  treatmentId: string;
  incidentId: string;
  insured: IInsured;
  treatmentItem: any;
}

@connect(
  (
    { dictionaryController, hkProcessController, formCommonController, claimEditable }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: hkProcessController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: hkProcessController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(hkProcessController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfHospitalType: dictionaryController.Dropdown_CLM_HosptialType,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating } = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'hkProcessController/saveTreatmentItem',
      payload: {
        changedFields: temChangedFields,
        incidentId,
        treatmentId,
      },
    });
  },
  mapPropsToFields(props: any) {
    const { treatmentItem } = props;

    return formUtils.mapObjectToFields(treatmentItem, {
      treatmentType: (value: any) => value,
      dateOfConsultation: (value: any) => (value ? moment(value) : null),
      dateOfAdmission: (value: any) => (value ? moment(value) : null),
      dateOfDischarge: (value: any) => (value ? moment(value) : null),
      medicalProvider: (value: any) => value,
      department: (value: any) => value,
      doctor: (value: any) => value,
      icu: (value: any) => value === 1,
      icuFromDate: (value: any) => (value ? moment(value) : null),
      icuToDate: (value: any) => (value ? moment(value) : null),
      medicalProviderDescription: (value: any) => value,
      isHospitalInDevelopedCountry: (value: any) => value,
      hospitalType: (value: any) => value,
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

  onSelect = (value, typeCode) => {
    const { dispatch, incidentId, treatmentId } = this.props;

    dispatch({
      type: 'hkProcessController/saveTreatmentItem',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfTreatmentType,
      incidentItem,
      insured,
      dictsOfHospitalType,
      treatmentItem,
    } = this.props;
    const isTreatmentTypeIP = formUtils.queryValue(treatmentItem.treatmentType) === ClaimType.IPD;
    const isTreatmentTypeOP = formUtils.queryValue(treatmentItem.treatmentType) === ClaimType.OPD;
    const medicalProviderValue = form.getFieldValue('medicalProvider');
    const isOtherMedicalProvider = lodash.some(
      TreatmentListitemOfBasicInfoArray,
      (item) => item === medicalProviderValue
    );
    const isICU = form.getFieldValue('icu');
    const { dateTimeOfDeath } = insured;
    const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
    const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
    const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
    const icuFromDateValue = form.getFieldValue('icuFromDate');

    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
          <FormItemSelect
            form={form}
            required
            formName="treatmentType"
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
            dicts={dictsOfTreatmentType}
          />
          <FormItemDatePicker
            form={form}
            disabled={!isTreatmentTypeOP}
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
            disabled={!isTreatmentTypeIP}
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
            disabled={!isTreatmentTypeIP}
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
          <FormItemSelectPlus
            form={form}
            required={isTreatmentTypeIP}
            onSelectCallback={this.onSelect}
            formName="medicalProvider"
            searchName="medicalProvider"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            dropdownCode="claim_dict005"
            optionShowType="both"
            name="fieldTwo"
          />
          <FormItemInput
            form={form}
            formName="medicalProviderDescription"
            labelId="MedicalProviderDescription"
            name="fieldTwo"
            required={isOtherMedicalProvider}
            disabled={!isOtherMedicalProvider}
          />
          <FormItemCheckbox
            form={form}
            formName="isHospitalInDevelopedCountry"
            labelId="HospitalInDevelopedCountry"
          />
          <FormItemSelect
            form={form}
            formName="hospitalType"
            labelId="HospitalType"
            dicts={dictsOfHospitalType}
          />
          <FormItemSelectPlus
            form={form}
            dropdownCode="misc_dict006"
            optionShowType="both"
            searchName="dictionary"
            formName="department"
            labelId="app.navigator.task-detail-of-data-capture.label.department-of-treatment"
          />
          <FormItemInput
            form={form}
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
            disabled={!isTreatmentTypeIP}
            formName="icu"
            labelId="app.navigator.task-detail-of-data-capture.label.intensive-care-unit"
            name="fieldTwo"
          />
          <FormItemDatePicker
            form={form}
            disabled={!isTreatmentTypeIP}
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
            disabled={!isTreatmentTypeIP}
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

export default TreatmentListItemOfBasicInfo;
