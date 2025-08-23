import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, {
  FormItemInput,
  FormItemDatePicker,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';

import { VLD_000184 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  causeOfDeath: any;
  DeathType: any;
  DeathfromProcedure: any;
}

class Death extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      causeOfDeath,
      DeathType,
      DeathfromProcedure,
    } = this.props;
    const procedure = form.getFieldValue('procedure');
    return (
      <FormSection
        form={form}
        formId={`Death_${documentId}`}
        layout={Layout}
        title="claim.title.death"
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required
          formName="dateTimeOfDeath"
          labelId="claim.death.dateTimeOfDeath"
          format="L"
        />
        <FormItemSelect
          form={form}
          required
          disabled={taskNotEditable}
          formName="aCauseOfDeath"
          labelId="claim.death.aCauseOfDeath"
          dicts={causeOfDeath}
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="bCauseOfA"
          maxLength={100}
          labelId="claim.death.bCauseOfA"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="cCauseOfB"
          maxLength={100}
          labelId="claim.death.cCauseOfB"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="cCauseOfD"
          maxLength={30}
          labelId="claim.death.cCauseOfD"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="diagnosisNameOfDeath"
          maxLength={100}
          labelId="claim.death.diagnosisNameOfDeath"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="procedure"
          labelId="claim.death.procedure"
          dicts={DeathfromProcedure}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="operationDateOfSurgery"
          required={VLD_000184({ checkValue: procedure })}
          labelId="claim.death.operationDateOfSurgery"
          format="L"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="deathType"
          labelId="claim.death.deathType"
          dicts={DeathType}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="injuryDate"
          labelId="claim.death.injuryDate"
          format="L"
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
    causeOfDeath: dictionaryController.causeOfDeath,
    DeathType: dictionaryController.DeathType,
    DeathfromProcedure: dictionaryController.DeathfromProcedure,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateTimeOfDeath',
        'operationDateOfSurgery',
        'injuryDate',
      ]);
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
        injuryDate: (value: any) => (value ? moment(value) : null),
        dateTimeOfDeath: (value: any) => (value ? moment(value) : null),
        operationDateOfSurgery: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Death)
);
