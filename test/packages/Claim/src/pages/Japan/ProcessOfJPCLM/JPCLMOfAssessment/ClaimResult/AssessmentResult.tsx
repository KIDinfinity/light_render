import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import json from './FormLayout.json';
import styles from './AssessmentResult.less';

const FORMID = 'claimDecision';

@connect(
  ({
    dictionaryController,
    JPCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
    claimDataStatus,
    loading,
  }) => ({
    assessmentTypeList: dictionaryController.assessmentType,
    dictsOfClaimDecision: dictionaryController.AssessmentDecision,
    dictOfAssessmentPreApproval: dictionaryController.AssessmentPreApproval,
    claimDecision: JPCLMOfClaimAssessmentController?.claimProcessData?.claimDecision,
    assessmentType: JPCLMOfClaimAssessmentController?.claimProcessData?.assessmentType,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    isClaimLoadEnd:
      claimDataStatus.isLoadEnd &&
      !loading.effects['dictionaryController/findDictionaryByTypeCodes'],
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    const target =
      lodash.keys(changedFields)[0] === 'assessmentType'
        ? 'saveAssessmentType'
        : 'saveClaimDecision';
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target,
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target,
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimDecision, isClaimLoadEnd, assessmentType, taskDetail } = props;

    return formUtils.mapObjectToFields(
      {
        ...claimDecision,
        assessmentType: !isClaimLoadEnd ? '' : assessmentType || taskDetail?.assessmentType,
      },
      {
        assessmentDecision: (value) => value,
        diagnosisFormAmount: (value) => value,
      }
    );
  },
})
class AssessmentResult extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;
    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;
    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  render() {
    const {
      form,
      dictsOfClaimDecision,
      dictOfAssessmentPreApproval,
      taskNotEditable,
      assessmentTypeList,
      isClaimLoadEnd,
    } = this.props;
    return (
      <div className={styles.result}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="claimPayableAmount"
              labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="totalPayableAmount"
              labelId="app.navigator.task-detail-of-claim-assessment.label.total-payment-amount"
            />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              precision={0}
              formName="diagnosisFormAmount"
              labelId="app.navigator.task-detail-of-claim-assessment.label.diagnosis-form-amount"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              formName="preApprovalValue"
              labelId="app.navigator.task-detail-of-claim-assessment.label.pre-approval"
              dicts={dictOfAssessmentPreApproval}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              formName="assessmentType"
              labelId="app.navigator.task-detail-of-data-capture.label.assessment-type"
              dicts={assessmentTypeList}
              loading={!isClaimLoadEnd}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              formName="assessmentDecision"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-decision"
              dicts={dictsOfClaimDecision}
            />
          </FormLayout>
        </Form>
      </div>
    );
  }
}

export default AssessmentResult;
