import React, { Component } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import FormSection from 'basic/components/Form/FormSection';
import { FormItemInput, formUtils } from 'basic/components/Form';
import { FormId } from '../../Enum';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
}
class ContactAddress extends Component<IProps> {
  render() {
    const { form } = this.props;
    return (
      <FormSection
        form={form}
        formId={FormId.ContactAddress}
        title={formatMessageApi({
          Label_BIZ_Claim:
            'venus_claim.phowb.dataCapture.label.currentContactAddress.insuredInformation',
        })}
        layConf={8}
        isMargin
      >
        <FormItemInput
          form={form}
          formName="residenceTelNo"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.residenceTelNo"
        />
        <FormItemInput
          form={form}
          formName="businessTelNo"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.currentBusinessOfficeTelNo"
        />
        <FormItemInput
          form={form}
          formName="mobileTelNo"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.currentContactAddress.mobilePhoneNo"
        />
        <FormItemInput
          form={form}
          formName="preferredMailingAddress"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.currentContactAddress.preferredMailingAddress"
        />
        <FormItemInput
          form={form}
          formName="preferredMailingAddressDetails"
          disabled
          labelId="venus_claim.phowb.dataCapture.label.currentContactAddress.details"
        />
      </FormSection>
    );
  }
}

export default connect(({ phowbDataCaptureController, dictionaryController }: any) => ({
  contractMailingAddress:
    phowbDataCaptureController.claimProcessData.posDataDetail.contractMailingAddress,
  Dropdown_POS_PreferredMailingAddr: dictionaryController.Dropdown_POS_PreferredMailingAddr,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { contractMailingAddress, Dropdown_POS_PreferredMailingAddr }: any = props;
      const name = lodash
        .chain(Dropdown_POS_PreferredMailingAddr)
        .find({ dictCode: contractMailingAddress?.preferredMailingAddress })
        .get('dictName')
        .value();

      return formUtils.mapObjectToFields({
        ...contractMailingAddress,
        preferredMailingAddress: name,
      });
    },
  })(ContactAddress)
);
