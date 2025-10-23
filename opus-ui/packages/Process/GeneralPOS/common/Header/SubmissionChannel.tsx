import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import FormSection, { FormItemSelect, formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import styles from './index.less';
import useCheckCaptiva from '../../BaseProduct/_hooks/useCheckCaptiva';
const FORMID = 'dataCaptureSubmissionChannel';

function SubmissionChannel(props: any) {
  const dispatch = useDispatch();

  const { form, claimEditable }: any = props;
  const disabled = useCheckCaptiva();
  const submissionChannelList = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_POS_SubmissionChannel
  );

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
    <div className={styles.submissionChannel}>
      <FormSection
        form={form}
        formId="DataCapture_SubmissionDate"
        isMargin={false}
        isPadding={false}
        title=""
        isHideBgColor
        layConf={24}
      >
        <FormItemSelect
          form={form}
          dicts={submissionChannelList}
          formName="submissionChannel"
          disabled={claimEditable || disabled}
          required
          labelId="SubmissionChannel"
          getPopupContainer={() => document.body}
        />
      </FormSection>
    </div>
  );
}

export default connect(
  ({ formCommonController, claimEditable, [NAMESPACE]: modelnamepsace }: any) => ({
    validating: formCommonController.validating,
    submissionChannel: modelnamepsace.processData.submissionChannel,
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
      const { submissionChannel } = props;
      return formUtils.mapObjectToFields({ submissionChannel });
    },
  })(SubmissionChannel)
);
