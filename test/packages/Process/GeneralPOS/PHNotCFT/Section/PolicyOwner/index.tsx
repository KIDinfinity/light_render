import React from 'react';
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
import NonCftLabel from 'process/GeneralPOS/common/NonCftLabel';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  policyOwner: object;
  name?: string;
  Gender: any[];
  policyOwnerInformation: any;
}

const PolicyOwner = (props: IProps) => {
  const { form, Gender, policyOwnerInformation, Dropdown_CFG_Country } = props;
  return (
    <FormSection
      form={form}
      formId={FormId.PolicyOwner}
      title={
        <div>
          {policyOwnerInformation?.vip === '1' ? (
            <div className={styles.policyOwnerInfoTitle}>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim:
                    'venus_claim.phowb.dataCapture.label.policyOwnerInformation.title',
                })}
              </span>
              <span>
                <NonCftLabel />
              </span>
            </div>
          ) : (
            formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.policyOwnerInformation.title',
            })
          )}
        </div>
      }
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
      <FormItemInput form={form} formName="surname" disabled labelId="venus_claim.label.surname" />
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
      <FormItemSelect
        form={form}
        formName="nationality"
        disabled
        labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.nationality"
        dicts={Dropdown_CFG_Country}
      />
    </FormSection>
  );
};

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, dictionaryController }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    policyOwnerInformation:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.policyOwnerInformation,
    Gender: dictionaryController.Gender,
    Dropdown_CFG_Country: dictionaryController?.Dropdown_CFG_Country,
  })
)(
  Form.create({
    mapPropsToFields(props) {
      const { policyOwnerInformation }: any = props;
      return formUtils.mapObjectToFields(policyOwnerInformation);
    },
  })(PolicyOwner)
);
