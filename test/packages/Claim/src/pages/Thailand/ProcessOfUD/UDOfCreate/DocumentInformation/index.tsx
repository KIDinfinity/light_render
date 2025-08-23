import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import type { Dispatch } from 'redux';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  form: any;
  dispatch: Dispatch;
  claimProcessData: any;
  ActivityType: any[];
}

class CaseInformation extends Component<IProps> {
  render() {
    const { form, ActivityType } = this.props;
    return (
      <FormSection
        form={form}
        formId="DocumentInformation"
        title="venus_claim.label.documentInformation"
        layout={Layout}
      >
        <FormItemSelect
          form={form}
          formName="activityType"
          dicts={ActivityType}
          labelId="venus_claim.label.activityType"
        />
        <FormItemInput formName="firstName" form={form} labelId="venus_claim.label.firstName" />
        <FormItemInput form={form} formName="lastName" labelId="venus_claim.label.surname" />
        <FormItemInput
          form={form}
          formName="identityId"
          maxLength={20}
          labelId="venus_claim.label.identityNo"
        />
      </FormSection>
    );
  }
}

export default connect(({ UDOfCreateController, dictionaryController }: any) => ({
  claimProcessData: UDOfCreateController.claimProcessData,
  ActivityType: dictionaryController.ActivityType,
}))(
  Form.create<IProps>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      dispatch({
        type: 'UDOfCreateController/saveDocumentInfo',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props: IProps) {
      const { claimProcessData } = props;
      return formUtils.mapObjectToFields(claimProcessData, {
        fistName: (value: any) => value || null,
        lastName: (value: any) => value || null,
        identityId: (value: any) => value || null,
      });
    },
  })(CaseInformation)
);
