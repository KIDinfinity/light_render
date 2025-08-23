import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';

import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemCheckbox,
  FormItemNumber,
  FormItemSelectPlus,
  formUtils,
  Validator,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { treatmentLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentItem: IIncident;
  treatmentId: string;
  incidentId: string;
  insured: IInsured;
  totalInvoiceNetExpense: number;
}

@connect(
  (
    { dictionaryController, hbOfClaimAssessmentController }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfMainBenefit: dictionaryController.MainBenefit,
    treatmentItem: hbOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: hbOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.insured'),
    caseCategory: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    assessmentDecision: hbOfClaimAssessmentController.claimProcessData?.claimDecision?.assessmentDecision || '',
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId } = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }
    dispatch({
      type: 'hbOfClaimAssessmentController/saveTreatmentItem',
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
      mainBenefit: (value: any) => value,
      dateOfConsultation: (value: any) => (value ? moment(value) : null),
      dateOfAdmission: (value: any) => (value ? moment(value) : null),
      dateOfDischarge: (value: any) => (value ? moment(value) : null),
      medicalProvider: (value: any) => value,
      patientNo: (value: any) => value,
      doctor: (value: any) => value,
      icuDays: (value: any) => value,
      icu: (value: any) => !!value,
      totalInvoiceNetExpense: (value: any) => value,
    });
  },
})
class TreatmentListItemOfBasicInfo extends Component<IProps> {
  render() {
    const { form, incidentItem, caseCategory, assessmentDecision }: any = this.props;
    const isIPD = formUtils.queryValue(incidentItem.claimType) === 'IP';
    const isOPD = formUtils.queryValue(incidentItem.claimType) === 'OP';

    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
          <FormItemSelectPlus
            form={form}
            disabled
            required
            formName="medicalProvider"
            searchName="medicalProviderth"
            searchCustom={getMedicalProvider(caseCategory)}
            name="fieldTwo"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            optionShowType="both"
            rules={[
              {
                validator: Validator.VLD_000271(
                  formUtils.queryValue(assessmentDecision)
                ),
              },
            ]}
          />
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isIPD}
              formName="dateOfAdmission"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
              format="L"
            />
          )}
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isIPD}
              className="timeOfAdmission"
              formName="dateOfAdmission"
              labelId="app.navigator.task-detail-of-data-capture.label.time-of-admission"
              mode="time"
              showTime
              format="LT"
            />
          )}
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isIPD}
              formName="dateOfDischarge"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
              format="L"
            />
          )}
          {isIPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isIPD}
              className="timeOfDischarge"
              formName="dateOfDischarge"
              labelId="app.navigator.task-detail-of-data-capture.label.time-of-discharge"
              mode="time"
              showTime
              format="LT"
            />
          )}
          {isOPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isOPD}
              formName="dateOfConsultation"
              labelId="venus-claim-label-dateOfVisit"
              format="L"
            />
          )}
          {isOPD && (
            <FormItemDatePicker
              form={form}
              disabled
              required={isOPD}
              className="timeOfVisit"
              formName="dateOfConsultation"
              labelId="venus-claim-label-timeOfVisit"
              mode="time"
              showTime
              format="LT"
            />
          )}
          <FormItemInput
            form={form}
            disabled
            formName="patientNo"
            maxLength={20}
            labelId="venus-claim-label-hN"
          />
          <FormItemCheckbox form={form} disabled formName="icu" labelId="app.claim.label.icu" />
          <FormItemNumber
            form={form}
            disabled
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
