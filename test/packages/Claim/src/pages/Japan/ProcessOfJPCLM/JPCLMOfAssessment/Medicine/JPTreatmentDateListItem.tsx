import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';

const FORMID_PREFIX = 'treatmentDate';

@connect(
  (
    { JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
    { treatmentDateId }
  ) => ({
    jpTreatmentDateListItem:
      JPCLMOfClaimAssessmentController.claimEntities.jpTreatmentDateListMap[treatmentDateId],
    claimNo: JPCLMOfClaimAssessmentController?.claimProcessData?.claimNo,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, treatmentId, medicineId, treatmentDateId, claimNo, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'JPCLMOfClaimAssessmentController/saveDateOfTreatmentItem',
        payload: {
          changedFields,
          treatmentId,
          medicineId,
          treatmentDateId,
          claimNo,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { jpTreatmentDateListItem } = props;
    return formUtils.mapObjectToFields(jpTreatmentDateListItem, {
      treatmentDate: (value) => (value ? moment(value) : null),
    });
  },
})
class JPTreatmentDateListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentDateId } = this.props;

    if (treatmentDateId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${treatmentDateId}`,
            },
          },
          0
        );
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, treatmentDateId } = this.props;

    if (treatmentDateId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${treatmentDateId}`,
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
    const { dispatch, treatmentId, medicineId, treatmentDateId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeDateOfTreatmentItem',
      payload: {
        treatmentId,
        medicineId,
        treatmentDateId,
      },
    });
  };

  render() {
    const { form, DateOfTreatmentItemIndex, rules, taskNotEditable } = this.props;
    return (
      <FormItemDatePicker
        form={form}
        disabled={taskNotEditable}
        required={DateOfTreatmentItemIndex === 0}
        formName="treatmentDate"
        labelId={
          DateOfTreatmentItemIndex === 0
            ? 'app.navigator.JPCA-of-manual-assessment.label.date-of-treatment'
            : ''
        }
        rules={rules}
      />
    );
  }
}

export default JPTreatmentDateListItem;
