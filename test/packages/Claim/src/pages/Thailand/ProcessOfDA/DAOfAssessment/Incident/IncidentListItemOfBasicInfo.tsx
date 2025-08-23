import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import lodash from 'lodash';
import { Form } from 'antd';
import {
  FormLayout,
  FormItemDatePicker,
  FormItemTimePicker,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';

import { VLD_000180 } from 'claim/pages/validators/fieldValidators';
import type { IDictionary } from '@/dtos/dicts';
import type { IInsured } from '@/dtos/claim';
import { Dropdown_CLM_SubClaimType } from 'claim/enum/Dropdown_CLM_SubClaimType';

import { incidentWithTreatmentLayout } from '../FormLayout.json';

const FORMID_PRFIX = 'IncidentListItem';

interface IProps extends FormComponentProps {
  form?: any;
  dispatch?: Dispatch<any>;
  dictsOfClaimType?: IDictionary[];
  dictsOfCauseOfIncident?: IDictionary[];
  loadingOfFindDictionary?: boolean;
  incidentItemExpandStatus?: boolean;
  incidentId?: string;
  insured?: IInsured;
  validating?: boolean;
  dictionaryController?: any;
  firstConsultationDateRequire: boolean;
}
// @ts-ignore
@connect(
  (
    {
      daOfClaimAssessmentController,
      dictionaryController,
      loading,
      formCommonController,
      claimEditable,
    }: any,
    { incidentId }: any
  ) => ({
    dictionaryController: dictionaryController,
    dictsOfClaimType: dictionaryController.APDAClaimType || [],
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    incidentItem: daOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
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
    return formUtils.mapObjectToFields(incidentItem);
  },
})
class IncidentListItemBasicInfo extends Component<IProps> {
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
      incidentItem,
      dictsOfClaimType,
      dictsOfCauseOfIncident,
      loadingOfFindDictionary,
      caseCategory,
      taskNotEditable,
      dictionaryController,
      firstConsultationDateRequire,
    }: any = this.props;

    const is_accident = formUtils.queryValue(incidentItem.causeOfIncident) === 'A';
    const dictsOfSubClaimType =
      dictionaryController?.[Dropdown_CLM_SubClaimType?.[form.getFieldValue('claimType')]] || [];

    return (
      <Form layout="vertical">
        <FormLayout json={incidentWithTreatmentLayout}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            formName="claimType"
            rules={[
              {
                validator: VLD_000180(caseCategory),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.claim-type"
            dicts={dictsOfClaimType}
            loading={loadingOfFindDictionary}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfSubClaimType}
            formName="subClaimType"
            labelId="subClaimType"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            formName="causeOfIncident"
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
            dicts={dictsOfCauseOfIncident}
            loading={loadingOfFindDictionary}
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            requiredTriggerValidate
            required={is_accident}
            formName="incidentDate"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-incident"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            disabled={taskNotEditable}
            formName="incidentTime"
            labelId="app.navigator.task-detail-of-data-capture.label.time-of-incident"
            format="LT"
          />
          <FormItemDatePicker
            form={form}
            requiredTriggerValidate
            required={firstConsultationDateRequire}
            disabled={taskNotEditable}
            formName="firstConsultationDate"
            labelId="venus.claim.label.diagnosis-date"
            format="L"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default IncidentListItemBasicInfo;
