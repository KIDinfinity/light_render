import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import type { IDictionary, INationality } from '@/dtos/dicts';
import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import Layout from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  ReporttoPolice: IDictionary[];
  Drinking: IDictionary[];
  MoveonSpot: IDictionary[];
  DrivingLicense: INationality[];
  documentId: string;
  formData: any;
  taskNotEditable: boolean;
}
class Incident extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      ReporttoPolice,
      Drinking,
      MoveonSpot,
      DrivingLicense,
      documentId,
    } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Incident_${documentId}`}
        layout={Layout}
        title="venus_claim.label.incidentInformation"
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required
          formName="dateOfIncident"
          labelId="venus_claim.label.dateOfIncident"
          format="L"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="reportToPolice"
          labelId="venus_claim.label.reportToPolice"
          dicts={ReporttoPolice}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="drinking"
          labelId="venus_claim.label.drinking"
          dicts={Drinking}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="action"
          labelId="venus_claim.label.action"
          name="action"
          dicts={MoveonSpot}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="drivingLicense"
          labelId="venus_claim.label.drivingLicense"
          name="drivingLicense"
          dicts={DrivingLicense}
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController, dictionaryController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    ReporttoPolice: dictionaryController.ReporttoPolice,
    Drinking: dictionaryController.Drinking,
    MoveonSpot: dictionaryController.MoveonSpot,
    DrivingLicense: dictionaryController.DrivingLicense,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfIncident']);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormData',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormData',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;

      return formUtils.mapObjectToFields(formData, {
        dateOfIncident: (value: any) => (value ? moment(value) : null),
        reportToPolice: (value: string | object) => value,
        drinking: (value: string | object) => value,
        action: (value: string | object) => value,
        drivingLicense: (value: string | object) => value,
      });
    },
  })(Incident)
);
