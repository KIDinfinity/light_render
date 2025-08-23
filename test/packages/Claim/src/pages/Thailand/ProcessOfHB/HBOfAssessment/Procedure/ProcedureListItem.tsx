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

const FORMID_PREFIX = 'ProcedureListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  procedureId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
  existProcedureItems: string[];
}

@connect(({ hbOfClaimAssessmentController, claimEditable }: any, { procedureId }: any) => ({
  procedureItem: hbOfClaimAssessmentController.claimEntities.procedureListMap[procedureId],
  taskNotEditable: claimEditable.taskNotEditable,
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, procedureId, treatmentId } = props;

    dispatch({
      type: 'hbOfClaimAssessmentController/saveProcedureItem',
      payload: {
        changedFields,
        treatmentId,
        procedureId,
      },
    });
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
  handleDelete = () => {
    const { dispatch, treatmentId, procedureId } = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  render() {
    const { form, dataIndex, taskNotEditable }: any = this.props;

    return (
      <CardOfClaim showButton={taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={procedureLayout}>
            <FormItemSelectPlus
              form={form}
              disabled
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
              format="L"
              disabled
              required
              formName="operationDate"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
            />
            <FormItemNumber
              form={form}
              required={dataIndex === 0}
              min={0}
              max={100}
              disabled
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
