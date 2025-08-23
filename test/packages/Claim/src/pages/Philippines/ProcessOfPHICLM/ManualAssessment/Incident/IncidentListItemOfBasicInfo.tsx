import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import lodash from 'lodash';
import moment from 'moment';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { incidentDateEarlierDeathDate } from 'claimBasicProduct/pages/validators';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { InsuredState } from 'claim/enum/InsuredState';
import { incidentWithTreatmentLayout, incidentNoTreatmentLayout } from '../FormLayout.json';

const FORMID_PRFIX = 'IncidentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfClaimType: IDictionary[];
  dictsOfCauseOfIncident?: IDictionary[];
  incidentItemExpandStatus: boolean;
  incidentItem: IIncident;
  incidentId: string;
  insured: IInsured;
}
// @ts-ignore
@connect(
  (
    {
      PHCLMOfClaimAssessmentController,
      dictionaryController,
      formCommonController,
      claimEditable,
    }: any,
    { incidentId }: any
  ) => ({
    dictsOfClaimType: dictionaryController.Dropdown_CLM_PHClaimType,
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    dictsOfReasonForWaiver: dictionaryController.Dropdown_CLM_ReasonForWaiver,
    incidentItem: PHCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    dateTimeOfDeath: lodash.get(
      PHCLMOfClaimAssessmentController,
      'claimProcessData.insured.dateTimeOfDeath'
    ),
    currentState: lodash.get(
      PHCLMOfClaimAssessmentController,
      'claimProcessData.insured.currentState'
    ),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
          target: 'saveIncidentItem',
          payload: {
            changedFields,
            incidentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { incidentItem } = props;

    return formUtils.mapObjectToFields(incidentItem, {
      claimTypeArray: (value: any) => (value === null ? [] : value),
      causeOfIncident: (value: any) => value,
      incidentDate: (value: any) => (value ? moment(value) : null),
      incidentPlace: (value: any) => value,
      incidentInDetail: (value: any) => value,
      reasonForWaiver: (value: any) => value,
      partOfBodyInjuredArray: (value: any) => (value === null ? [] : value),
      dateTimeOfDeath: (value: string | object) => (value ? moment(value) : null),
    });
  },
})
class IncidentListItemBasicInfo extends PureComponent<IProps> {
  registeForm = () => {
    const { dispatch, form, incidentId }: any = this.props;
    if (incidentId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${incidentId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentId }: any = this.props;

    if (incidentId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PRFIX}_${incidentId}`,
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
      dictsOfClaimType,
      dictsOfCauseOfIncident,
      hasTreatment,
      dateTimeOfDeath,
      currentState,
      taskNotEditable,
      incidentItem,
      dictsOfReasonForWaiver,
    }: any = this.props;

    const claimType = form.getFieldValue('claimTypeArray');
    const isInsuredDead = formUtils.queryValue(currentState) === InsuredState.deceased;
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
    const isDeathClaim = lodash.includes(incidentItem.claimTypeArray, 'DTH');
    const isWOPClaimType = lodash.includes(claimType, 'WOPI') || lodash.includes(claimType, 'WOPO');

    return (
      <Form layout="vertical">
        <FormLayout json={hasTreatment ? incidentWithTreatmentLayout : incidentNoTreatmentLayout}>
          <FormItemSelect
            form={form}
            mode="multiple"
            disabled={taskNotEditable}
            dicts={
              isInsuredDead
                ? dictsOfClaimType
                : lodash.filter(dictsOfClaimType, (value: IDictionary) => value.dictCode !== 'DTH')
            }
            required
            formName="claimTypeArray"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-type"
            name="fieldOne"
          />
          {isWOPClaimType && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              dicts={dictsOfReasonForWaiver}
              formName="reasonForWaiver"
              labelId="Reasonforwaiver"
            />
          )}
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfCauseOfIncident}
            formName="causeOfIncident"
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
          />
          <FormItemDatePicker
            form={form}
            required
            disabled={taskNotEditable}
            formName="incidentDate"
            labelId="app.navigator.task-detail-of-claim-assessment.label.date-of-incident"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) =>
                  incidentDateEarlierDeathDate(rule, value, callback, dateTimeOfDeathValue),
              },
            ]}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="incidentPlace"
            labelId="app.navigator.task-detail-of-data-capture.label.place-of-incident"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="incidentInDetail"
            labelId="app.navigator.task-detail-of-data-capture.label.detail-description-of-incident"
          />
          <FormItemSelectPlus
            form={form}
            mode="multiple"
            disabled={taskNotEditable}
            dropdownCode="claim_dict006"
            optionShowType="both"
            searchName="partOfBodyInjured"
            formName="partOfBodyInjuredArray"
            labelId="app.navigator.task-detail-of-data-capture.label.post-of-body-injured"
            name="fieldOne"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !isInsuredDead}
            required={isInsuredDead}
            formName="dateTimeOfDeath"
            labelId="DateOfDeath"
          />
          {isDeathClaim && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="immediateCause"
              maxLength={240}
              labelId={formatMessageApi({ 'Claim Screen Label': 'ImmediateCause' })}
              name="fieldCause"
            />
          )}
          {isDeathClaim && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="antecedentCause"
              labelId={formatMessageApi({ 'Claim Screen Label': 'AntecedentCause' })}
              maxLength={240}
              name="fieldCause"
            />
          )}
          {isDeathClaim && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="underlyingCause"
              labelId={formatMessageApi({ 'Claim Screen Label': 'UnderlyingCause' })}
              maxLength={240}
              name="fieldCause"
            />
          )}
          {isDeathClaim && (
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="otherSignificantCause"
              labelId={formatMessageApi({ 'Claim Screen Label': 'OtherSignificantCause' })}
              maxLength={240}
              name="fieldCause"
            />
          )}
        </FormLayout>
      </Form>
    );
  }
}

export default IncidentListItemBasicInfo;
