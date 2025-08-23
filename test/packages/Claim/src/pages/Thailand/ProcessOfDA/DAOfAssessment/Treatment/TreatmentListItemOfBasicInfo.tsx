import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';

import { CauseOfIncident } from 'claim/enum/CauseOfIncident';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  FormItemCheckbox,
  FormItemSelectPlus,
  FormItemTimePicker,
  formUtils,
  Validator,
} from 'basic/components/Form';
import { VLD_000004, VLD_000018, VLD_000274 } from 'claim/pages/validators/fieldValidators';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { isPartialBill, isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import CaseCategory from 'enum/CaseCategory';
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
  totalInvoiceNetExpense: number;
}

@connect(
  (
    {
      dictionaryController,
      daOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfMainBenefit: dictionaryController.MainBenefit,
    treatmentItem: daOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: daOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(daOfClaimAssessmentController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    taskNotEditable: claimEditable.taskNotEditable,
    submissionDate: daOfClaimAssessmentController.claimProcessData.submissionDate,
    assessmentDecision:
      daOfClaimAssessmentController.claimProcessData?.claimDecision?.assessmentDecision || '',
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
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
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
          type: 'daOfClaimAssessmentController/saveFormData',
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

    return formUtils.mapObjectToFields(treatmentItem);
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
    const {
      form,
      incidentItem,
      treatmentItem,
      caseCategory,
      taskNotEditable,
      submissionDate,
      assessmentDecision,
    }: any = this.props;
    const isIPD = formUtils.queryValue(incidentItem.claimType) === 'IP';
    const isOPD = formUtils.queryValue(incidentItem.claimType) === 'OP';
    const isOPDCase = caseCategory === CaseCategory.TH_GC_CTG03;
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
            rules={[
              {
                validator: Validator.VLD_000271(formUtils.queryValue(assessmentDecision)),
              },
            ]}
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
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={!isPreArrangement(caseCategory) && !isPartialBill(caseCategory)}
              rules={[
                {
                  validator: VLD_000018(
                    formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmission'))
                  ),
                },
              ]}
              formName="dateOfDischarge"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
              format="L"
            />
          )}
          {isIPD && (
            <FormItemTimePicker
              form={form}
              disabled={taskNotEditable}
              requiredTriggerValidate
              required={!isPreArrangement(caseCategory) && !isPartialBill(caseCategory)}
              rules={[
                {
                  validator: VLD_000018(
                    formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmission')),
                    'minute'
                  ),
                },
              ]}
              className="timeOfDischarge"
              formName="dateOfDischarge"
              labelId="app.navigator.task-detail-of-data-capture.label.time-of-discharge"
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
          <FormItemNumber
            form={form}
            disabled={taskNotEditable}
            formName="icuDays"
            maxLength={99}
            precision={0}
            labelId="app.navigator.task-detail-of-data-capture.label.icu-days"
          />
          <FormItemNumber
            form={form}
            disabled
            formName="totalInvoiceNetExpense"
            labelId="venus.claim.label.total-invoice-net-expense"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
