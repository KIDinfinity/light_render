import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
import { VLD_000004, VLD_000274 } from 'claim/pages/validators/fieldValidators';

import { CauseOfIncident } from 'claim/enum/CauseOfIncident';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemCheckbox,
  FormItemSelectPlus,
  FormItemTimePicker,
  formUtils,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { APDAClaimType } from 'claim/enum/APDAClaimType';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentItem: IIncident;
  treatmentId: string;
  incidentId: string;
  insured: IInsured;
  validating: boolean;
}

@connect(
  (
    { apOfClaimCaseController, formCommonController, claimEditable }: any,
    { treatmentId, incidentId }: any
  ) => ({
    treatmentItem: apOfClaimCaseController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: apOfClaimCaseController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(apOfClaimCaseController, 'claimProcessData.insured'),
    caseCategory: lodash.get(apOfClaimCaseController, 'claimProcessData.caseCategory'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    submissionDate: apOfClaimCaseController.claimProcessData.submissionDate,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimCaseController/saveEntry',
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
          type: 'apOfClaimCaseController/saveFormData',
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
      mainBenefit: (value: any) => value,
      dateOfAdmission: (value: any) => (value ? moment(value) : null),
      medicalProvider: (value: any) => value,
      patientNo: (value: any) => value,
      doctor: (value: any) => value,
      icu: (value: any) => value,
      icuDays: (value: any) => value,
    });
  },
})
class TreatmentListItemOfBasicInfo extends Component<IProps> {
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
    const { form, incidentItem, taskNotEditable, submissionDate, caseCategory }: any = this.props;
    const isIPD = formUtils.queryValue(incidentItem.claimType) === APDAClaimType.IPD;
    const isOPD = formUtils.queryValue(incidentItem.claimType) === APDAClaimType.OPD;
    const isillness =
      formUtils.queryValue(incidentItem.causeOfIncident) === CauseOfIncident.illness;
    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable}
            required
            formName="medicalProvider"
            searchName="medicalProviderth"
            searchCustom={getMedicalProvider(caseCategory)}
            name="fieldTwo"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            optionShowType="both"
          />
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={isIPD}
              formName="dateOfAdmission"
              rules={[
                {
                  validator: VLD_000004(
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
                    'day',
                    isillness
                  ),
                },
                {
                  validator: VLD_000274(formUtils.queryValue(submissionDate)),
                },
              ]}
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
              format="L"
            />
          )}
          {isIPD && (
            <FormItemTimePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={isIPD}
              className="timeOfAdmission"
              formName="dateOfAdmission"
              rules={[
                {
                  validator: VLD_000004(
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
                    'minute',
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentTime')) ||
                      moment().hour(0).minute(0).second(0),
                    isillness
                  ),
                },
              ]}
              labelId="app.navigator.task-detail-of-data-capture.label.time-of-admission"
              format="LT"
            />
          )}
          {isOPD && (
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={isOPD}
              rules={[
                {
                  validator: VLD_000004(
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
                    'day',
                    isillness
                  ),
                },
                {
                  validator: VLD_000274(formUtils.queryValue(submissionDate)),
                },
              ]}
              className="timeOfVisit"
              formName="dateOfConsultation"
              labelId="venus-claim-label-dateOfVisit"
              format="L"
            />
          )}
          {isOPD && (
            <FormItemTimePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={isOPD}
              rules={[
                {
                  validator: VLD_000004(
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentDate')),
                    'minute',
                    formUtils.queryValue(lodash.get(incidentItem, 'incidentTime')) ||
                      moment().hour(0).minute(0).second(0),
                    isillness
                  ),
                },
              ]}
              className="timeOfVisit"
              formName="dateOfConsultation"
              labelId="venus-claim-label-timeOfVisit"
              format="LT"
            />
          )}
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="patientNo"
            maxLength={20}
            labelId="venus-claim-label-hN"
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="icu"
            labelId="app.claim.label.icu"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="icuDays"
            maxLength={99}
            labelId="app.navigator.task-detail-of-data-capture.label.icu-days"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
