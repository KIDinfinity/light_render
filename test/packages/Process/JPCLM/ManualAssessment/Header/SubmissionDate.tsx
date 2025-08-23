import React, { Component } from 'react';
import { connect } from 'dva';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormSection from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import styled from './submissionDate.less';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
const FORMID = 'assessmentSubmissionDate';

class SubmissionDate extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, taskNotEditable }: any = this.props;
    const inputLimitDate = tenant.getInputLimitDate();
    const allowFreeSelect = !lodash.isEmpty(inputLimitDate);
    return (
      <div className={styled.submissionDate}>
        <FormSection
          form={form}
          formId="Assessment_submissionDate"
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemDatePicker
            form={form}
            formName="submissionDate"
            required
            disabled={taskNotEditable}
            labelId="app.navigator.task-detail-of-jpcr.label.submission-date"
            getCalendarContainer={() => document.body}
            allowFreeSelect={allowFreeSelect}
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ claimEditable, formCommonController, JPCLMOfClaimAssessment }: any) => ({
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
  submissionDate: JPCLMOfClaimAssessment.claimProcessData?.submissionDate,
}))(
  Form.create({
    onFieldsChange(props, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'updateSubmissionDate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveFormData',
              target: 'updateSubmissionDate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { submissionDate }: any = props;
      return formUtils.mapObjectToFields({
        submissionDate,
      });
    },
  })(SubmissionDate)
);
