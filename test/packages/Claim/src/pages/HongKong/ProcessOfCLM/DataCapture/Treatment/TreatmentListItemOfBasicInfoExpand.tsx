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
import { TreatmentListitemOfBasicInfoArrayHK } from 'claim/pages/Enum/TreatmentItemBasicInfoArr';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItemExpand';

interface IProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentItem?: IIncident;
  treatmentId: string;
  incidentId: string;
  insured?: IInsured;
  validating?: boolean;
  taskNotEditable?: boolean;
  treatmentItem?: any;
  dictsOfHospitalType: IDictionary[];
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  validating: any;
}

@connect(
  (
    {
      dictionaryController,
      HKCLMOfDataCaptureController,
      formCommonController,
      claimEditable,
    }: any,
    { treatmentId, incidentId }: any
  ) => ({
    treatmentItem: HKCLMOfDataCaptureController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: HKCLMOfDataCaptureController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(HKCLMOfDataCaptureController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfHospitalType: dictionaryController.Dropdown_CLM_HosptialType,
    dictsOfPlaceOfHospital: dictionaryController.Dropdown_CLM_PlaceOfHospital,
    dictsOfRoomType: dictionaryController.Dropdown_CLM_RoomType,
  })
)
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating } = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfDataCaptureController/saveEntry',
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
          type: 'HKCLMOfDataCaptureController/saveFormData',
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
      roomType: (value: any) => value,
      medicalProviderPlace: (value: any) => value,
    });
  },
})
class TreatmentListItemOfBasicInfoExpand extends PureComponent<IProps> {
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

  onSelect = (value: any, typeCode: any) => {
    const { dispatch, incidentId, treatmentId } = this.props;

    dispatch({
      type: 'HKCLMOfDataCaptureController/saveTreatmentItem',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });

    dispatch({
      type: 'HKCLMOfDataCaptureController/getProviderPlaceByMedicalCode',
      payload: {
        medicalProviderCode: value,
        treatmentId,
      },
    });
  };

  render() {
    const {
      form,
      incidentItem,
      insured,
      taskNotEditable,
      dictsOfHospitalType,
      treatmentItem,
      dictsOfPlaceOfHospital,
      dictsOfRoomType,
    } = this.props;
    const isTreatmentTypeIP = formUtils.queryValue(treatmentItem.treatmentType) === ClaimType.IPD;
    const medicalProviderValue = form.getFieldValue('medicalProvider');
    const isOtherMedicalProvider = lodash.some(
      TreatmentListitemOfBasicInfoArrayHK,
      (item) => item === medicalProviderValue
    );
    console.log(isOtherMedicalProvider, TreatmentListitemOfBasicInfoArrayHK, medicalProviderValue);
    const isICU = form.getFieldValue('icu');
    const { dateTimeOfDeath } = insured;
    const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
    const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
    const isInclude =
      lodash.includes(claimTypeArray, ClaimType.IPD) ||
      lodash.includes(claimTypeArray, ClaimType.OPD);
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
    const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');
    const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
    const icuFromDateValue = form.getFieldValue('icuFromDate');

    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
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
          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable}
            required={isTreatmentTypeIP || isInclude}
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
            disabled={!isOtherMedicalProvider || taskNotEditable}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required={medicalProviderValue}
            formName="medicalProviderPlace"
            labelId="medicalProviderPlace"
            dicts={dictsOfPlaceOfHospital}
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="isHospitalInDevelopedCountry"
            labelId="HospitalInDevelopedCountry"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="hospitalType"
            labelId="HospitalType"
            dicts={dictsOfHospitalType}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="roomType"
            labelId="roomType"
            dicts={dictsOfRoomType}
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

export default TreatmentListItemOfBasicInfoExpand;
