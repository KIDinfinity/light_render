/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { VLD_000083 } from '@/utils/validations';
import { VLD_000060OtherProcedure } from 'claim/pages/validators/fieldValidators';
import { findFieldWarning } from '@/utils/medicalSearch';
import json from '../FormLayout.json';

const FORMID_PREFIX = 'otherProcedureItem';
const VALIDATE_FIELDS = ['procedureType', 'advancedTreatmentCode', 'procedureName'];
const getFormKey = (id) => {
  return `${FORMID_PREFIX}_${id}`;
};
@connect(
  (
    {
      dictionaryController,
      JPCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
      medicalValidate,
    },
    { otherProcedureId, incidentId }
  ) => ({
    dictsOfProcedureType: dictionaryController.ProcedureType,
    // procedureDropdown: dictionaryController?.surgeryProcedureDropdown?.list,
    otherProcedureItem:
      JPCLMOfClaimAssessmentController.claimEntities.otherProcedureListMap[otherProcedureId],
    claimTypeArray:
      JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId].claimTypeArray,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    treatmentListMap: JPCLMOfClaimAssessmentController.claimEntities.treatmentListMap,
    otherProcedureListMap: JPCLMOfClaimAssessmentController.claimEntities.otherProcedureListMap,
    warningList: medicalValidate.validateResult[getFormKey(otherProcedureId)],
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, otherProcedureId, treatmentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveOtherProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              otherProcedureId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveOtherProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            otherProcedureId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { otherProcedureItem } = props;

    return formUtils.mapObjectToFields(otherProcedureItem, {
      operationDate: (value) => (value ? moment(value) : null),
      fromDate: (value) => (value ? moment(value) : null),
      toDate: (value) => (value ? moment(value) : null),
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
    this.registeForm();
    const { dispatch } = this.props;
    if (this.isValidate) {
      const { otherProcedureItem, treatmentId, otherProcedureId } = this.props;
      dispatch({
        type: 'medicalValidate/validateRequest',
        payload: {
          item: otherProcedureItem,
          preItem: {},
          fields: VALIDATE_FIELDS,
          objectType: 2,
          key: getFormKey(otherProcedureId),
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetOtherProdureFieldsValue',
          changeFormParams: {
            treatmentId,
            otherProcedureId,
          },
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, otherProcedureId } = this.props;

    if (otherProcedureId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${otherProcedureId}`,
            },
          },
          0
        );
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, otherProcedureId } = this.props;

    if (otherProcedureId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${otherProcedureId}`,
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
    const { dispatch, treatmentId, otherProcedureId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeOtherProcedureItem',
      payload: {
        treatmentId,
        otherProcedureId,
      },
    });
  };

  handleBlur = () => {
    const { otherProcedureItem, treatmentId, otherProcedureId, dispatch } = this.props;
    if (this.isValidate) {
      dispatch({
        type: 'medicalValidate/updateValues',
        payload: {
          item: otherProcedureItem,
          preItem: {},
          fields: VALIDATE_FIELDS,
          objectType: 2,
          key: getFormKey(otherProcedureId),
          changeFormAction: 'JPCLMOfClaimAssessmentController/resetOtherProdureFieldsValue',
          changeFormParams: {
            treatmentId,
            otherProcedureId,
          },
        },
      });
    }
  };

  render() {
    const {
      form,
      dictsOfProcedureType,
      claimTypeArray,
      taskNotEditable,
      otherProcedureItem,
      warningList,
      treatmentListMap,
      otherProcedureListMap,
    } = this.props;
    const procedureTypeIsRadioactive = form.getFieldValue('procedureType') === '01';
    const procedureTypeIsAdvanced = form.getFieldValue('procedureType') === '02';
    const VLD000083 = VLD_000083(claimTypeArray);

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={dictsOfProcedureType}
              formName="procedureType"
              labelId="app.navigator.task-detail-of-data-capture.label.procedure-type"
              warningMessage={findFieldWarning({
                list: warningList,
                id: otherProcedureItem?.id,
                fieldCode: 'procedureType',
              })}
              handleBlur={this.handleBlur}
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              required
              formName="fromDate"
              labelId="app.navigator.task-detail-of-data-capture.label.from-date-v2"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              required
              formName="toDate"
              labelId="app.navigator.task-detail-of-data-capture.label.to-date-v2"
            />
            {procedureTypeIsRadioactive && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required={VLD000083}
                formName="partOfBody"
                maxLength={100}
                labelId="app.navigator.task-detail-of-data-capture.label.post-of-body-injured"
              />
            )}
            {procedureTypeIsRadioactive && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required
                formName="procedureCode"
                maxLength={100}
                labelId="app.navigator.task-detail-of-data-capture.label.radiotherapy-category"
                rules={[
                  {
                    validator: VLD_000060OtherProcedure(
                      treatmentListMap,
                      otherProcedureListMap,
                      otherProcedureItem
                    ),
                  },
                ]}
              />
            )}
            {procedureTypeIsAdvanced && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                required
                formName="procedureName"
                maxLength={100}
                labelId="app.navigator.task-detail-of-data-capture.label.procedure-item"
                warningMessage={findFieldWarning({
                  list: warningList,
                  id: otherProcedureItem?.id,
                  fieldCode: 'procedureName',
                })}
                onBlur={this.handleBlur}
              />
            )}
            {procedureTypeIsAdvanced && (
              <FormItemNumber
                form={form}
                disabled={taskNotEditable}
                required
                precision={0}
                formName="expense"
                labelId="app.navigator.task-detail-of-data-capture.label.expense"
              />
            )}
            {procedureTypeIsAdvanced && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="advancedTreatmentCode"
                maxLength={20}
                labelId="venus_claim.label.advanced-treatment-code"
                warningMessage={findFieldWarning({
                  list: warningList,
                  id: otherProcedureItem?.id,
                  fieldCode: 'advancedTreatmentCode',
                })}
                onBlur={this.handleBlur}
              />
            )}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default ProcedureListItem;
