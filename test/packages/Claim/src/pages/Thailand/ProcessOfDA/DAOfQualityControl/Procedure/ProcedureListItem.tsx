import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemSelectPlus,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { procedureLayout } from '../FormLayout.json';
import { getexistProcedureCodes } from 'claim/pages/utils/getexistProcedureCodes';

const FORMID_PREFIX = 'ProcedureListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  procedureId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
  procedureListMap: any;
}

@connect(
  (
    { daOfClaimCaseController, formCommonController, claimEditable }: any,
    { procedureId }: any
  ) => ({
    procedureItem: daOfClaimCaseController.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    procedureListMap: daOfClaimCaseController.claimEntities.procedureListMap,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, procedureId, treatmentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimCaseController/saveEntry',
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
          type: 'daOfClaimCaseController/saveFormData',
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
    const { procedureItem } = props;

    return formUtils.mapObjectToFields(procedureItem, {
      procedureCode: (value: any) => value,
      operationDate: (value: any) => (value ? moment(value) : null),
      reimbursementPercentage: (value: any) => value,
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
      type: 'daOfClaimCaseController/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  render() {
    const { form, dataIndex, taskNotEditable, procedureListMap }: any = this.props;

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={procedureLayout}>
            <FormItemSelectPlus
              form={form}
              disabledDictCodes={getexistProcedureCodes(procedureListMap)}
              disabled={taskNotEditable}
              required
              maxLength={64}
              formName="procedureCode"
              searchName="surgeryProcedure"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
              name="fieldTwo"
              dropdownCode="claim_dict008"
              optionShowType="both"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              required
              formName="operationDate"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
              format="L"
            />
            <FormItemNumber
              form={form}
              requiredTriggerValidate
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
