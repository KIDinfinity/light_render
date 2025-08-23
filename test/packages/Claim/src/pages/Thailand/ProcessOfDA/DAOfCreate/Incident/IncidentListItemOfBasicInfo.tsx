import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import lodash from 'lodash';
import moment from 'moment';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemTimePicker from 'basic/components/Form/FormItem/FormItemTimePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import { Dropdown_CLM_SubClaimType } from 'claim/enum/Dropdown_CLM_SubClaimType';
import { incidentWithTreatmentLayout } from '../FormLayout.json';

const FORMID_PRFIX = 'IncidentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfClaimType: IDictionary[];
  dictsOfCauseOfIncident?: IDictionary[];
  loadingOfFindDictionary?: boolean;
  incidentItemExpandStatus: boolean;
  incidentItem: IIncident;
  incidentId: string;
  insured: IInsured;
  validating: boolean;
  dictionaryController: any;
}
@connect(
  (
    { daProcessController, dictionaryController, loading, formCommonController }: any,
    { incidentId }: any
  ) => ({
    dictionaryController: dictionaryController,
    dictsOfClaimType: dictionaryController.APDAClaimType || [],
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    incidentItem: daProcessController.claimEntities.incidentListMap[incidentId],
    caseCategory: lodash.get(daProcessController, 'claimProcessData.caseCategory'),
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'daProcessController/saveIncidentItem',
      payload: {
        changedFields,
        incidentId,
      },
    });
  },
  mapPropsToFields(props) {
    const { incidentItem } = props;
    return formUtils.mapObjectToFields(incidentItem, {
      claimType: (value: any) => value,
      causeOfIncident: (value: any) => value,
      incidentDate: (value: any) => (value ? moment(value) : null),
      incidentTime: (value: any) => (value ? moment(value) : null),
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
      incidentItem,
      dictsOfClaimType,
      dictsOfCauseOfIncident,
      loadingOfFindDictionary,
      dictionaryController,
    } = this.props;

    const is_accident = formUtils.queryValue(incidentItem.causeOfIncident) === 'A';
    const dictsOfSubClaimType = dictionaryController?.[Dropdown_CLM_SubClaimType?.[form.getFieldValue('claimType')]] || []

    return (
      <Form layout="vertical">
        <FormLayout json={incidentWithTreatmentLayout}>
          <FormItemSelect
            form={form}
            formName="claimType"
            labelId="app.navigator.task-detail-of-data-capture.label.claim-type"
            dicts={dictsOfClaimType}
            loading={loadingOfFindDictionary}
          />
          <FormItemSelect
            form={form}
            dicts={dictsOfSubClaimType}
            formName="subClaimType"
            labelId="subClaimType"
          />
          <FormItemSelect
            form={form}
            formName="causeOfIncident"
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
            dicts={dictsOfCauseOfIncident}
            loading={loadingOfFindDictionary}
          />
          <FormItemDatePicker
            form={form}
            formName="incidentDate"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-incident"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            formName="incidentTime"
            labelId="app.navigator.task-detail-of-data-capture.label.time-of-incident"
            format="LT"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default IncidentListItemBasicInfo;
