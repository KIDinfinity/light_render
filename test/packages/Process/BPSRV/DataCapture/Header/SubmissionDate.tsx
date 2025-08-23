import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import FormSection, { FormItemDatePicker, formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { NAMESPACE } from '../activity.config';

const FORMID = 'dataCaptureSubmissionDate';

function SubmissionDate(props: any) {
  const dispatch = useDispatch();

  const { form, claimEditable }: any = props;

  const registeForm = () => {
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  const unRegisterForm = () => {
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  useEffect(() => {
    registeForm();
    return () => {
      unRegisterForm();
    };
  }, []);

  return (
    <div>
      <FormSection
        form={form}
        formId="DataCapture_SubmissionDate"
        isMargin={false}
        isPadding={false}
        title=""
        isHideBgColor
        layConf={24}
      >
        <FormItemDatePicker
          form={form}
          formName="submissionDate"
          disabled={claimEditable}
          required
          labelId="SubmissionDate"
          getCalendarContainer={() => document.body}
        />
      </FormSection>
    </div>
  );
}

export default connect(
  ({ formCommonController, claimEditable, [NAMESPACE]: modelnamepsace }: any) => ({
    validating: formCommonController.validating,
    submissionDate: modelnamepsace.processData.submissionDate,
    claimEditable: claimEditable.taskNotEditable,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'submissionDateUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'submissionDateUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { submissionDate } = props;
      return formUtils.mapObjectToFields({ submissionDate });
    },
  })(SubmissionDate)
);
