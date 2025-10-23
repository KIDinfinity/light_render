import React, { Component } from 'react';
import { connect } from 'dva';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormSection from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import moment from 'moment';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
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
    const { form, taskNotEditable, disabled = false, dispatch }: any = this.props;
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
            disabled={taskNotEditable || disabled}
            labelId="app.navigator.task-detail-of-jpcr.label.submission-date"
            getCalendarContainer={() => document.body}
            allowFreeSelect={allowFreeSelect}
            onChange={(value: any) => {
              const oldValue = moment(form.getFieldValue('submissionDate')).format('YYYY/MM/DD');
              if (oldValue !== moment(value).format('YYYY/MM/DD')) {
                dispatch({
                  type: `${NAMESPACE}/syncFieldData`,
                  payload: {
                    submissionDate: value,
                  },
                });
              }
            }}
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ claimEditable, formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    submissionDate: modelnamepsace.businessData?.submissionDate,
  })
)(
  //@ts-ignore
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updateSubmissionDate',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { submissionDate }: any = props;
      return formUtils.mapObjectToFields({
        submissionDate,
      });
    },
  })(SubmissionDate)
);
