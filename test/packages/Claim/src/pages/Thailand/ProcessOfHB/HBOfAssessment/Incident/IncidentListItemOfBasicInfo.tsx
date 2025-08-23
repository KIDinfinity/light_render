import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import lodash from 'lodash';
import moment from 'moment';
import { Form } from 'antd';
import {
  FormLayout,
  FormItemDatePicker,
  FormItemTimePicker,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
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
  dictionaryController: any;
}
@connect(
  ({ hbOfClaimAssessmentController, dictionaryController, loading }: any, { incidentId }: any) => ({
    dictionaryController: dictionaryController,
    dictsOfClaimType: dictionaryController.APDAClaimType || [],
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    incidentItem: hbOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    caseCategory: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.caseCategory'),
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId } = props;

    dispatch({
      type: 'hbOfClaimAssessmentController/saveIncidentItem',
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
    const dictsOfSubClaimType =
      dictionaryController?.[Dropdown_CLM_SubClaimType?.[form.getFieldValue('claimType')]] || [];

    return (
      <Form layout="vertical">
        <FormLayout json={incidentWithTreatmentLayout}>
          <FormItemSelect
            form={form}
            disabled
            required
            formName="claimType"
            // rules={[
            //   {
            //     validator: VLD_000029(caseCategory),
            //   },
            // ]}
            labelId="app.navigator.task-detail-of-data-capture.label.claim-type"
            dicts={dictsOfClaimType}
            loading={loadingOfFindDictionary}
          />
          <FormItemSelect
            form={form}
            disabled
            dicts={dictsOfSubClaimType}
            formName="subClaimType"
            labelId="subClaimType"
          />
          <FormItemSelect
            form={form}
            disabled
            required
            formName="causeOfIncident"
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
            dicts={dictsOfCauseOfIncident}
            loading={loadingOfFindDictionary}
          />
          <FormItemDatePicker
            form={form}
            disabled
            required={is_accident}
            formName="incidentDate"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-incident"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            disabled
            formName="incidentTime"
            labelId="app.navigator.task-detail-of-data-capture.label.time-of-incident"
            format="LT"
          />
          <FormItemDatePicker
            form={form}
            disabled
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
