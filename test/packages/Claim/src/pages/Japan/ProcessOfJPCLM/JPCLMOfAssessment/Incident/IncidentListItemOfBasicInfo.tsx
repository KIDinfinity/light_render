/* eslint-disable import/no-unresolved */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import IncidentListItemOfBasicInfoItem from './IncidentListItemOfBasicInfoItem';
import json from '../FormLayout.json';

const FORMID_PRFIX = 'incidentListItem';
// @ts-ignore
@connect(
  (
    {
      dictionaryController,
      JPCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { incidentId }: any
  ) => ({
    dictsOfClaimType: dictionaryController.ClaimType,
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    incidentItem: JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    causeOfIncident: JPCLMOfClaimAssessmentController.causeOfIncident[incidentId],
    isClaimTypeDisable:
      lodash.findIndex(
        lodash.get(
          JPCLMOfClaimAssessmentController,
          'claimProcessData.claimRelation.incidentDocRelationList',
          []
        ),
        (el) => el.incidentId === incidentId
      ) !== -1,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
    const { incidentItem }: any = props;
    return formUtils.mapObjectToFields(incidentItem, {
      incidentDate: (value: any) => (value ? moment(value) : null),
      claimTypeArray: (value: any) => (value === null ? [] : value),
    });
  },
})
class IncidentListItemOfBasicInfo extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentId }: any = this.props;
    if (incidentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PRFIX}_${incidentId}`,
            },
          },
          0
        );
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentId }: any = this.props;

    if (incidentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PRFIX}_${incidentId}`,
            },
          },
          0
        );
      });
    }
  };

  render() {
    const {
      form,
      dictsOfClaimType,
      dictsOfCauseOfIncident,
      incidentId,
      // isClaimTypeDisable,
      taskNotEditable,
      causeOfIncident,
    }: any = this.props;
    const isIncidentDateRequired = form.getFieldValue('causeOfIncident') === 'A';
    return (
      <Fragment>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemSelect
              form={form}
              mode="multiple"
              disabled={taskNotEditable}
              dicts={dictsOfClaimType}
              required
              formName="claimTypeArray"
              labelId="venus.cliam.jpclm.assessment.label.cliamType"
              name="row24"
            />
            <FormItemSelect
              form={form}
              disabled
              required
              warningMessage={causeOfIncident ? [causeOfIncident] : []}
              dicts={dictsOfCauseOfIncident}
              formName="systemCauseOfIncident"
              labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={dictsOfCauseOfIncident}
              formName="adjustCauseOfIncident"
              labelId="app.navigator.task-detail-of-data-capture.label.adjust-case-of-incident"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              required={isIncidentDateRequired}
              formName="incidentDate"
              labelId="app.navigator.task-detail-of-claim-assessment.label.date-of-incident"
            />
          </FormLayout>
        </Form>
        <IncidentListItemOfBasicInfoItem
          incidentId={incidentId}
          claimTypeArray={form.getFieldValue('claimTypeArray')}
        />
      </Fragment>
    );
  }
}

export default IncidentListItemOfBasicInfo;
