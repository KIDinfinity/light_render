import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import FormSection, { FormItemDatePicker, formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import styles from './index.less';
import useCheckCaptiva from '../../BaseProduct/_hooks/useCheckCaptiva';

const FORMID = 'dataCaptureSubmissionDate';

function SubmissionDate(props: any) {
  const dispatch = useDispatch();
  const disabled = useCheckCaptiva();

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
    <div className={styles.submissionDate}>
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
          disabled={claimEditable || disabled}
          required
          labelId="SubmissionDate"
          getCalendarContainer={() => document.body}
        />
      </FormSection>
    </div>
  );
}

export default connect(({ claimEditable, [NAMESPACE]: modelnamepsace }: any) => ({
  submissionDate: modelnamepsace.processData.submissionDate,
  claimEditable: claimEditable.taskNotEditable,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'submissionDateUpdate',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { submissionDate } = props;
      return formUtils.mapObjectToFields({ submissionDate });
    },
  })(SubmissionDate)
);
