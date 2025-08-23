import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import lodash from 'lodash';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import {
  operationDateLaterIncidentDate,
  operationDateEarlierDeathDate,
} from 'claimBasicProduct/pages/validators';
import { ProcedureCode } from 'claim/pages/Enum';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemSelectPlus,
  FormItemInput,
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
}

@connect(({ JPCLMProcessCreate, formCommonController }: any, { incidentId, procedureId }: any) => ({
  procedureItem: JPCLMProcessCreate.claimEntities.procedureListMap[procedureId],
  incidentDate: JPCLMProcessCreate.claimEntities.incidentListMap[incidentId].incidentDate,
  dateTimeOfDeath: lodash.get(JPCLMProcessCreate, 'claimProcessData.insured.dateTimeOfDeath'),
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, procedureId, treatmentId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'JPCLMProcessCreate/saveProcedureItem',
        payload: {
          changedFields,
          treatmentId,
          procedureId,
        },
      });
    }
  },
  mapPropsToFields(props: any) {
    const { procedureItem } = props;

    return formUtils.mapObjectToFields(procedureItem, {
      procedureCode: (value: any) => value,
      procedureDescription: (value: any) => value,
      operationDate: (value: any) => (value ? moment(value) : null),
    });
  },
})
class ProcedureListItem extends PureComponent<IProps> {
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
      type: 'JPCLMProcessCreate/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  render() {
    const { form, incidentDate, dateTimeOfDeath } = this.props;
    const incidentDateValue = formUtils.queryValue(incidentDate);
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
    const procedureCodeValue = form.getFieldValue('procedureCode');
    const isProcedureCodeOTHS = procedureCodeValue === ProcedureCode.Others;
    return (
      <CardOfClaim showButton handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={procedureLayout}>
            <FormItemSelectPlus
              form={form}
              required
              formName="procedureCode"
              searchName="surgeryProcedure"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
              dropdownCode="claim_dict007"
              optionShowType="both"
              name="fieldTwo"
            />
            <FormItemInput
              form={form}
              formName="procedureDescription"
              labelId="ProcedureDescription"
              name="fieldTwo"
              disabled={!isProcedureCodeOTHS}
              required={isProcedureCodeOTHS}
            />
            <FormItemDatePicker
              form={form}
              required
              formName="operationDate"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
              rules={[
                {
                  validator: (rule: any, value: any, callback: Function) =>
                    operationDateLaterIncidentDate(rule, value, callback, incidentDateValue),
                },
                {
                  validator: (rule: any, value: any, callback: Function) =>
                    operationDateEarlierDeathDate(rule, value, callback, dateTimeOfDeathValue),
                },
              ]}
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ProcedureListItem;
