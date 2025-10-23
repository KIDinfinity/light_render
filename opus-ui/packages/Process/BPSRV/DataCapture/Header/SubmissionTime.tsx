import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import FormSection, { FormItemTimePicker, formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { NAMESPACE } from '../activity.config';

const FORMID = 'dataCaptureSubmissionDate';

const Hours = Array.from(Array(24), (v, i) => i);

const Minutes = Array.from(Array(60), (v, i) => i);

function SubmissionTime(props: any) {
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

  const disabledHours = () => {
    if (
      new Date(formUtils.queryValue(form.getFieldValue('submissionDate'))).getDate() <
      new Date().getDate()
    )
      return [];
    return Hours.filter((item: any) => item > new Date().getHours());
  };

  const disabledMinutes = () => {
    if (
      new Date(formUtils.queryValue(form.getFieldValue('submissionDate'))).getDate() <
        new Date().getDate() ||
      (new Date(formUtils.queryValue(form.getFieldValue('submissionDate'))).getDate() ===
        new Date().getDate() &&
        new Date(formUtils.queryValue(form.getFieldValue('submissionDate'))).getHours() <
          new Date().getHours())
    )
      return [];
    return Minutes.filter((item: any) => item > new Date().getMinutes());
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
        <FormItemTimePicker
          form={form}
          formName="submissionDate"
          disabled={claimEditable}
          format="HH:mm"
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          required
          labelId="SubmissionTime"
        />
      </FormSection>
    </div>
  );
}

export default connect(({ formCommonController,claimEditable, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  submissionDate: modelnamepsace.processData.submissionDate,
  claimEditable: claimEditable.taskNotEditable,
}))(
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
  })(SubmissionTime)
);
