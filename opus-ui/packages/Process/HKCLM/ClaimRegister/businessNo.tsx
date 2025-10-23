import React from 'react';
import { NAMESPACE } from './activity.config';
import { connect, useDispatch } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  validating: boolean;
  businessNo: number;
}

const BusinessNo = props => {
  const { form, taskNotEditable } = props;
  const dispatch = useDispatch();

  return (
    <FormSection
      form={form}
      formId="DataCapture_SubmissionChannle"
      isMargin={false}
      isPadding={false}
      title=""
      isHideBgColor
      layConf={24}
    >
      <FormItemInput
        form={form}
        formName="inquiryClaimNo"
        required
        onBlur={() => {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/checkBusinessNo`,
            })
          }, 200)
        }}
        disabled={taskNotEditable}
        labelId="BusinessNo"
      />
    </FormSection>
  );
}

export default connect(
  ({
    claimEditable,
    [NAMESPACE]: modelnamepsace,
    formCommonController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    inquiryClaimNo: modelnamepsace.claimProcessData?.inquiryClaimNo,
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (shouldUpdateState(validating, changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'updateSubmissionChannel',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'updateSubmissionChannel',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { inquiryClaimNo }: any = props;
      return formUtils.mapObjectToFields(
        {
          inquiryClaimNo,
        },
        {}
      );
    },
  })(BusinessNo)
);
