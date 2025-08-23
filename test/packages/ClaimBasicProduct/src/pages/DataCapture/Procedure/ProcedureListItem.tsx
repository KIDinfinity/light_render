import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import lodash from 'lodash';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import {
  operationDateLaterIncidentDate,
  operationDateEarlierDeathDate,
} from 'claimBasicProduct/pages/validators';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemDatePicker, FormItemSelectPlus, formUtils } from 'basic/components/Form';
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

@connect(
  (
    { bpOfDataCaptureController, formCommonController, claimEditable }: any,
    { incidentId, procedureId }: any
  ) => ({
    procedureItem: bpOfDataCaptureController.claimEntities.procedureListMap[procedureId],
    incidentDate: bpOfDataCaptureController.claimEntities.incidentListMap[incidentId].incidentDate,
    dateTimeOfDeath: lodash.get(
      bpOfDataCaptureController,
      'claimProcessData.insured.dateTimeOfDeath'
    ),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
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
            type: 'bpOfDataCaptureController/saveEntry',
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
          type: 'bpOfDataCaptureController/saveFormData',
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
    });
  },
})
class ProcedureListItem extends PureComponent<IProps> {
  sectionRef = React.createRef();

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
    deleteWarning({
      sectionRef: this.sectionRef,
      sectionID: SectionID.Procedure,
    }).then(() => {
      dispatch({
        type: 'bpOfDataCaptureController/removeProcedureItem',
        payload: {
          treatmentId,
          procedureId,
        },
      });
    });
  };

  render() {
    const { form, incidentDate, dateTimeOfDeath, taskNotEditable } = this.props;
    const incidentDateValue = formUtils.queryValue(incidentDate);
    const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        ref={this.sectionRef}
      >
        <Form layout="vertical">
          <FormLayout json={procedureLayout}>
            <FormItemSelectPlus
              form={form}
              disabled={taskNotEditable}
              required
              formName="procedureCode"
              searchName="surgeryProcedure"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
              dropdownCode="claim_dict007"
              optionShowType="both"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
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
