import React, { Component } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';

import { VLD_000058, VLD_000251 } from 'claim/pages/validators/fieldValidators';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemDatePicker, FormItemInput, formUtils } from 'basic/components/Form';
import layout from './Layout';
import { TreatmentType } from '../Utils/constant';

const FORMID_PREFIX = 'ProcedureListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  procedureId: string;
  treatmentId: string;
  treatmentItem: any;
}

@connect(
  (
    { JPCLMOfClaimRegistrationController, formCommonController }: any,
    { procedureId, treatmentId }: any
  ) => ({
    procedureItem: JPCLMOfClaimRegistrationController.claimEntities.procedureListMap[procedureId],
    treatmentItem: JPCLMOfClaimRegistrationController.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, validating, treatmentId, procedureId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
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
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
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
      procedureName: (value: any) => value,
      stdProcedureName: (value: any) => value,
      kjCode: (value: any) => value,
      procedureCode: (value: any) => value,
      operationDateString: (value: any) => (value ? moment(value) : null),
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
      type: 'JPCLMOfClaimRegistrationController/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  getExistProcedure = () => {
    const { procedureId, procedureList } = this.props;

    return lodash.filter(procedureList, (item) => item.id !== procedureId);
  };

  render() {
    const { form, dataEditable, hospitalization, treatmentItem }: any = this.props;
    const dataNotEditable = !dataEditable;
    const existProcedure = this.getExistProcedure();
    const operationDate = form.getFieldValue('operationDateString');
    const noValidate = formUtils.queryValue(treatmentItem.treatmentType) === TreatmentType.OP;

    return (
      <CardOfClaim showButton={dataEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={layout}>
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="procedureName"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-name"
              name="procedureName"
            />
            <FormItemInput
              form={form}
              formName="stdProcedureName"
              disabled={dataNotEditable}
              labelId="app.navigator.task-detail-of-data-capture.label.std-procedure-name"
              name="stdProcedureName"
            />
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="kjCode"
              labelId="app.navigator.task-detail-of-data-capture.label.kj-code"
            />
            <FormItemInput
              form={form}
              disabled={dataNotEditable}
              formName="procedureCode"
              rules={[
                {
                  validator: VLD_000251(operationDate, existProcedure),
                },
              ]}
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
            />
            <FormItemDatePicker
              form={form}
              disabled={dataNotEditable}
              formName="operationDateString"
              rules={[
                {
                  validator: VLD_000058(hospitalization, !noValidate),
                },
              ]}
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ProcedureListItem;
