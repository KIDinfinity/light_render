import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

import FormSection from 'basic/components/Form/FormSection';
import {
  FormItemInput,
  FormItemSelect,
  FormItemDatePicker,
  formUtils,
} from 'basic/components/Form';
import { FormId } from '../../Enum';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  policyOwner: object;
  name?: string;
  Gender: any[];
}

class PolicyOwner extends Component<IProps> {
  render() {
    const { form, Gender } = this.props;

    return (
      <FormSection
        form={form}
        formId={FormId.PolicyOwner}
        title="PolicyOwnerInfo"
        layConf={8}
        formatType="Label_BIZ_Individual"
        isMargin
      >
        <FormItemInput form={form} formName="title" disabled labelId="form.title.label" />
        <FormItemInput
          form={form}
          formName="firstName"
          disabled
          labelId="venus_claim.label.firstName"
        />
        <FormItemInput
          form={form}
          formName="middleName"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.middleName"
        />
        <FormItemInput
          form={form}
          formName="surname"
          disabled
          labelId="venus_claim.label.surname"
        />
        <FormItemInput
          form={form}
          formName="extName"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.extName"
        />
        <FormItemSelect
          form={form}
          formName="gender"
          disabled
          labelId="venus_claim.label.gender"
          dicts={Gender}
        />

        <FormItemDatePicker
          form={form}
          formName="dateOfBirth"
          disabled
          labelId="venus_claim.label.dateOfBirth"
          format="L"
        />
        <FormItemInput
          form={form}
          formName="placeOfBirth"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.placeOfBirth"
        />
        <FormItemInput
          form={form}
          formName="nationality"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.nationality"
        />
      </FormSection>
    );
  }
}

export default connect(
  ({ claimEditable, phowbDataCaptureController, dictionaryController }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    policyOwnerInformation:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.policyOwnerInformation,
    Gender: dictionaryController.Gender,
  })
)(
  Form.create({
    mapPropsToFields(props) {
      const { policyOwnerInformation }: any = props;
      return formUtils.mapObjectToFields(policyOwnerInformation);
    },
  })(PolicyOwner)
);
