import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
import { procedureLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ProcedureListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  procedureId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
  validating: boolean;
}

@connect(
  (
    { daOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { procedureId }: any
  ) => ({
    procedureItem: daOfClaimAssessmentController.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, procedureId, treatmentId, validating } = props;
    if (shouldUpdateState(validating, changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              procedureId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            procedureId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { procedureItem, dataIndex } = props;

    return formUtils.mapObjectToFields(procedureItem, {
      procedureCode: (value: any) => value,
      operationDate: (value: any) => (value ? moment(value) : null),
      reimbursementPercentage: (value: any) => (dataIndex === 0 ? value : null),
    });
  },
})
class ProcedureListItem extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, procedureId } = this.props;

    if (procedureId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${procedureId}`,
        },
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, procedureId } = this.props;

    if (procedureId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${procedureId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, treatmentId, procedureId } = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  render() {
    const { form, dataIndex, taskNotEditable }: any = this.props;

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={procedureLayout}>
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              maxLength={64}
              formName="procedureCode"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
              name="fieldTwo"
            />
            <FormItemDatePicker
              form={form}
              format="L"
              disabled={taskNotEditable}
              required
              formName="operationDate"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
            />
            <FormItemNumber
              form={form}
              required={dataIndex === 0}
              min={0}
              max={100}
              disabled={taskNotEditable || dataIndex !== 0}
              formName="reimbursementPercentage"
              labelId="app.navigator.task-detail-of-claim-assessment.label.reimbursement-percentage"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ProcedureListItem;
