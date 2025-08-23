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
  FormItemTimePicker,
  formUtils,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { isPartialBill, isIDAC } from 'claim/pages/Thailand/flowConfig';
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
    { daProcessController, formCommonController, claimEditable }: any,
    { treatmentId, incidentId }: any
  ) => ({
    treatmentItem: daProcessController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: daProcessController.claimEntities.incidentListMap[incidentId],
    insured: lodash.get(daProcessController, 'claimProcessData.insured'),
    validating: formCommonController.validating,
    caseCategory: lodash.get(daProcessController, 'claimProcessData.caseCategory'),
    taskNotEditable: claimEditable.taskNotEditable,
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
    dispatch({
      type: 'daProcessController/saveTreatmentItem',
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
      icu: (value: any) => value,
      icuDays: (value: any) => value,
      totalInvoiceNetExpense: (value: any) => value,
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
    const { form, incidentItem, caseCategory }: any = this.props;
    const isIPD = formUtils.queryValue(incidentItem.claimType) === 'IP';
    const isOPD = formUtils.queryValue(incidentItem.claimType) === 'OP';

    return (
      <Form layout="vertical">
        <FormLayout json={treatmentLayout}>
          <FormItemSelectPlus
            form={form}
            formName="medicalProvider"
            searchName="medicalProviderth"
            searchCustom={getMedicalProvider(formUtils.queryValue(caseCategory))}
            name="fieldTwo"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            optionShowType="both"
          />
          <FormItemDatePicker
            form={form}
            requiredTriggerValidate
            required={
              isIPD ||
              isPartialBill(formUtils.queryValue(caseCategory)) ||
              isIDAC(formUtils.queryValue(caseCategory))
            }
            formName="dateOfAdmission"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            required={
              isIPD ||
              isPartialBill(formUtils.queryValue(caseCategory)) ||
              isIDAC(formUtils.queryValue(caseCategory))
            }
            className="timeOfAdmission"
            formName="dateOfAdmission"
            labelId="app.navigator.task-detail-of-data-capture.label.time-of-admission"
            format="LT"
          />
          <FormItemDatePicker
            form={form}
            // required={!isPreArrangement(formUtils.queryValue(caseCategory)) && !isPartialBill(formUtils.queryValue(caseCategory))}
            formName="dateOfDischarge"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            // required={!isPreArrangement(formUtils.queryValue(caseCategory)) && !isPartialBill(formUtils.queryValue(caseCategory))}
            className="timeOfDischarge"
            formName="dateOfDischarge"
            labelId="app.navigator.task-detail-of-data-capture.label.time-of-discharge"
            format="LT"
          />
          <FormItemDatePicker
            form={form}
            // required={isOPD}
            formName="dateOfConsultation"
            labelId="venus-claim-label-dateOfVisit"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            // required={isOPD}
            className="timeOfVisit"
            formName="dateOfConsultation"
            labelId="venus-claim-label-timeOfVisit"
            format="LT"
          />
          <FormItemInput
            form={form}
            formName="patientNo"
            maxLength={20}
            labelId="venus-claim-label-hN"
          />
          <FormItemCheckbox form={form} formName="icu" labelId="app.claim.label.icu" />
          <FormItemInput
            form={form}
            formName="icuDays"
            maxLength={99}
            labelId="app.navigator.task-detail-of-data-capture.label.icu-days"
          />
          <FormItemNumber
            form={form}
            formName="totalInvoiceNetExpense"
            labelId="venus.claim.label.total-invoice-net-expense"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
