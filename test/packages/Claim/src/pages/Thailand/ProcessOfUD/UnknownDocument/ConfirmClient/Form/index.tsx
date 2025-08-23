import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import type { Dispatch } from 'redux';
import { FormItemInput, formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  form: any;
  dispatch: Dispatch;
  claimProcessData: any;
}
@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class SearchForm extends Component<IProps> {
  render() {
    const { form, taskNotEditable } = this.props;
    return (
      <FormSection
        form={form}
        formId="ConfirmClient"
        title="venus_claim.label.confirmClient"
        layout={Layout}
        isHideBgColor
      >
        <FormItemInput
          form={form}
          formName="identityId"
          disabled={taskNotEditable}
          maxLength={20}
          labelId="venus_claim.label.identityNo"
        />
        <FormItemInput
          form={form}
          formName="firstName"
          disabled={taskNotEditable}
          labelId="venus_claim.label.firstName"
        />
        <FormItemInput
          form={form}
          formName="lastName"
          disabled={taskNotEditable}
          labelId="venus_claim.label.surname"
        />
      </FormSection>
    );
  }
}

export default connect(({ UnknownDocumentController }: any) => ({
  claimProcessData: UnknownDocumentController.claimProcessData,
}))(
  Form.create<IProps>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      dispatch({
        type: 'UnknownDocumentController/saveConfirmClient',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props: IProps) {
      const { claimProcessData } = props;
      return formUtils.mapObjectToFields(claimProcessData, {
        identityId: (value: any) => value || null,
        lastName: (value: any) => value || null,
        firstName: (value: any) => value || null,
      });
    },
  })(SearchForm)
);
