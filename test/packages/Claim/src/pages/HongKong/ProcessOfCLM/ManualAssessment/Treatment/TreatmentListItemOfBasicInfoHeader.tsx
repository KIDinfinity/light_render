import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemDatePicker, FormItemSelect, formUtils } from 'basic/components/Form';
import {
  consultationDateLaterIncidentDate,
  consultationDateEarlierDeathDate,
} from 'claimBasicProduct/pages/validators';

import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { IncidentCode } from 'claim/pages/Enum';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType?: IDictionary[];
  incidentItem?: IIncident;
  treatmentId: string;
  incidentId: string;
  insured?: IInsured;
  validating?: boolean;
  taskNotEditable?: boolean;
  treatmentItem?: any;
  form?: any;
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
      HKCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: HKCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: HKCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(HKCLMOfClaimAssessmentController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfHospitalType: dictionaryController.Dropdown_CLM_HosptialType,
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
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
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
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
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
class TreatmentListItemOfBasicInfoHeader extends PureComponent<IProps> {
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
      type: 'HKCLMOfClaimAssessmentController/saveTreatmentItem',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const { form, dictsOfTreatmentType, incidentItem, insured, taskNotEditable } = this.props;
    const treatmentTypeValue = form.getFieldValue('treatmentType');
    const isTreatmentTypeOP = treatmentTypeValue === IncidentCode.OutPatient;
    const { dateTimeOfDeath } = insured;
    const incidentDateValue = formUtils.queryValue(lodash.get(incidentItem, 'incidentDate'));
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);

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
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfoHeader;
