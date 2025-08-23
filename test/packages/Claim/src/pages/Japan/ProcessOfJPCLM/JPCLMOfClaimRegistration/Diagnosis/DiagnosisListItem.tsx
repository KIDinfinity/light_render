import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemDatePicker, formUtils } from 'basic/components/Form';
import layout from './Layout';

const FORMID_PREFIX = 'diagnosisListItem';

@connect(
  ({ JPCLMOfClaimRegistrationController, formCommonController }: any, { diagnosisId }: any) => ({
    diagnosisItem: JPCLMOfClaimRegistrationController.claimEntities.diagnosisListMap[diagnosisId],
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, diagnosisId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveDiagnosisItem',
            payload: {
              changedFields,
              diagnosisId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveDiagnosisItem',
          payload: {
            changedFields,
            diagnosisId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { diagnosisItem }: any = props;

    return formUtils.mapObjectToFields(diagnosisItem, {
      diagnosisName: (value: any) => value,
      stdDiagnosisName: (value: any) => value,
      diagnosisCode: (value: any) => value,
      diagnosisNo: (value: any) => value,
      identificationDateString: (value: any) => (value ? moment(value) : null),
    });
  },
})
class DiagnosisListItem extends Component {
  registeForm = () => {
    const { dispatch, form, diagnosisId }: any = this.props;

    if (diagnosisId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${diagnosisId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, diagnosisId }: any = this.props;

    if (diagnosisId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${diagnosisId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, incidentId, diagnosisId }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removeDiagnosisItem',
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  render() {
    const { form, dataEditable }: any = this.props;
    const dataNotEditable = !dataEditable;

    return (
      <CardOfClaim showButton={dataEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={layout}>
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="diagnosisName"
              maxLength={100}
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-name"
              name="diagnosisName"
            />
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="stdDiagnosisName"
              labelId="app.navigator.JPCA-of-manual-assessment.label.standard-diagnosis-name"
              name="stdDiagnosisName"
            />
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="diagnosisCode"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code"
            />
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="diagnosisNo"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-no"
            />
            <FormItemDatePicker
              form={form}
              disabled={dataNotEditable}
              formName="identificationDateString"
              labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-identification-date"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default DiagnosisListItem;
