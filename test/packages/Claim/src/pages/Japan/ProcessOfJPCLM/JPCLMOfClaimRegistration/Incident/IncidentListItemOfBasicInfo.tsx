import React, { Component } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import type { IIncident } from '@/dtos/claim';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { ClaimType } from '../Utils/constant';
import layout from './Layout';

const FORMID_PRFIX = 'IncidentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentItem: IIncident;
  incidentId: string;
}
@connect(
  (
    { JPCLMOfClaimRegistrationController, dictionaryController, formCommonController }: any,
    { incidentId }: any
  ) => ({
    incidentItem: JPCLMOfClaimRegistrationController.claimEntities.incidentListMap[incidentId],
    dictsOfClaimType: dictionaryController.ClaimType,
    dictsOfInsuredType: dictionaryController.InsuredType,
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, incidentId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
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
      claimType: (value: any) => value,
      insuredType: (value: any) => value,
      incidentDateString: (value: any) => (value ? moment(value) : null),
      causeOfIncident: (value: any) => value,
      currentStatus: (value: any) => value,
      causeOfDeath: (value: any) => value,
      deathDateString: (value: any) => (value ? moment(value) : null),
    });
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
      dataEditable,
      dictsOfClaimType,
      dictsOfCauseOfIncident,
      dictsOfInsuredType,
    } = this.props;
    const dataNotEditable = !dataEditable;
    const claimTypeValue = form.getFieldValue('claimType');
    const isRequired = lodash.includes(claimTypeValue, ClaimType.detah);

    return (
      <Form layout="vertical">
        <FormLayout json={layout}>
          <FormItemSelect
            form={form}
            required
            disabled={dataNotEditable}
            formName="claimType"
            dicts={dictsOfClaimType}
            labelId="app.navigator.task-detail-of-data-capture.label.claim-type"
            name="claimType"
          />
          <FormItemSelect
            form={form}
            disabled={dataNotEditable}
            formName="insuredType"
            dicts={dictsOfInsuredType}
            labelId="app.navigator.task-detail-of-data-capture.label.insured-type"
          />
          <FormItemDatePicker
            form={form}
            disabled={dataNotEditable}
            formName="incidentDateString"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-incident"
          />
          <FormItemSelect
            form={form}
            required
            disabled={dataNotEditable}
            formName="causeOfIncident"
            dicts={dictsOfCauseOfIncident}
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
          />
          <FormItemInput
            form={form}
            disabled={dataNotEditable}
            formName="currentStatus"
            labelId="app.navigator.task-detail-of-data-capture.label.current-state"
          />
          <FormItemInput
            form={form}
            required={isRequired}
            disabled={dataNotEditable}
            formName="causeOfDeath"
            labelId="app.navigator.task-detail-of-data-capture.label.cause-of-death"
          />
          <FormItemDatePicker
            form={form}
            required={isRequired}
            disabled={dataNotEditable}
            formName="deathDateString"
            labelId="app.navigator.task-detail-of-data-capture.label.death-date"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default IncidentListItemBasicInfo;
