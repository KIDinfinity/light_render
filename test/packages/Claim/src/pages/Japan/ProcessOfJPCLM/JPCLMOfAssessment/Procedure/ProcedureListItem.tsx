/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import CardOfClaim from 'basic/components/Form/FormCard';
import { VLD_000058, VLD_000061 } from 'claim/pages/validators/fieldValidators';
import json from '../FormLayout.json';
import { findFieldWarning } from '@/utils/medicalSearch';

const FORMID_PREFIX = 'ProcedureListItem';
const VALIDATE_FIELDS = ['procedureName', 'kjCode', 'procedureCode'];
const getFormKey = (id) => {
  return `${FORMID_PREFIX}_${id}`;
};

@connect(
  (
    { JPCLMOfClaimAssessmentController, formCommonController, claimEditable, medicalValidate },
    { procedureId }
  ) => ({
    procedureItem: JPCLMOfClaimAssessmentController.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    warningList: medicalValidate.validateResult[getFormKey(procedureId)],
    procedureListMap: JPCLMOfClaimAssessmentController.claimEntities.procedureListMap,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, procedureId, treatmentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
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
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
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
  mapPropsToFields(props) {
    const { procedureItem } = props;

    return formUtils.mapObjectToFields(procedureItem, {
      operationDate: (value) => (value ? moment(value) : null),
    });
  },
})
class ProcedureListItem extends PureComponent {
  static contextTypes = {
    isValidateWarning: PropTypes.bool,
  };

  get isValidate() {
    return this?.context?.isValidateWarning;
  }

  componentDidMount = () => {
    const { procedureItem, procedureId, treatmentId, dispatch } = this.props;
    this.registeForm();
    if (this.isValidate) {
      dispatch({
        type: 'medicalValidate/validateRequest',
        payload: {
          item: procedureItem,
          preItem: {},
          fields: VALIDATE_FIELDS,
          objectType: 1,
          key: getFormKey(procedureId),
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetProcedureItemFieldsValue',
          changeFormParams: {
            treatmentId,
            procedureId,
          },
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, procedureId } = this.props;

    if (procedureId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${procedureId}`,
            },
          },
          0
        );
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, procedureId } = this.props;

    if (procedureId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${procedureId}`,
            },
          },
          0
        );
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, treatmentId, procedureId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  getExistProcedureCode = () => {
    const { procedureId, procedureList } = this.props;
    const existProcedureCode = [];
    lodash.map(procedureList, (item) => {
      if (lodash.isPlainObject(item) && item.procedureCode && item.id !== procedureId) {
        existProcedureCode.push(formUtils.queryValue(item.procedureCode));
      }
    });

    return existProcedureCode;
  };

  handleBlur = () => {
    const { procedureItem, procedureId, treatmentId, dispatch } = this.props;
    if (this.isValidate) {
      dispatch({
        type: 'medicalValidate/validateRequest',
        payload: {
          item: procedureItem,
          preItem: {},
          fields: VALIDATE_FIELDS,
          objectType: 1,
          key: getFormKey(procedureId),
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetProcedureItemFieldsValue',
          changeFormParams: {
            treatmentId,
            procedureId,
          },
        },
      });
    }
  };

  render() {
    const {
      form,
      hospitalization,
      taskNotEditable,
      procedureItem,
      warningList,
      procedureListMap,
    } = this.props;
    const existProcedureCode = this.getExistProcedureCode();

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="procedureName"
              maxLength={100}
              name="row16"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-name"
              warningMessage={findFieldWarning({
                list: warningList,
                id: procedureItem?.id,
                fieldCode: 'procedureItem',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="stdProcedureName"
              labelId="app.navigator.JPCA-of-manual-assessment.label.standard-procedure-name"
              maxLength={100}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="procedureCode"
              maxLength={20}
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-code"
              required
              warningMessage={findFieldWarning({
                id: procedureItem?.id,
                list: warningList,
                fieldCode: 'procedureCode',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="kjCode"
              maxLength={20}
              labelId="app.navigator.task-detail-of-data-capture.label.kj-code"
              warningMessage={findFieldWarning({
                id: procedureItem?.id,
                list: warningList,
                fieldCode: 'kjCode',
              })}
              onBlur={this.handleBlur}
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              required
              rules={[
                {
                  validator: VLD_000058(hospitalization),
                },
                {
                  validator: VLD_000061(procedureListMap, procedureItem),
                },
              ]}
              formName="operationDate"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ProcedureListItem;
