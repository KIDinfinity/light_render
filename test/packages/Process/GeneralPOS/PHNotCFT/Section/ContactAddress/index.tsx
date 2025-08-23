import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { FormAntCard, formUtils } from 'basic/components/Form';
import Section, { Fields, SectionTitle } from './Section';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  validating: boolean;
}

const ContactAddress = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.ContactAddress}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="ContactAddress">
          <Fields.ResidenceTelNo />
          <Fields.BusinessTelNo />
          <Fields.MobileTelNo />
          <Fields.PreferredMailingAddress />
          <Fields.PreferredMailingAddressDetails />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ claimEditable, GeneralPOSPHNotCFTController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,

  policyDespatchAddressList:
    GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.policyInfo
      ?.policyDespatchAddressList,
  mainPolicyId: GeneralPOSPHNotCFTController.claimProcessData?.businessData?.mainPolicyId,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { policyDespatchAddressList = [], mainPolicyId }: any = props;
      const preferredMailingAddressItem =
        policyDespatchAddressList?.find((item) => item?.policyId === mainPolicyId) || {};
      const {
        preferredMailingAddress = '',
        emailAddress = '',
        wholeAddress = '',
        ...policyDespatchAddress
      } = policyDespatchAddressList?.length ? preferredMailingAddressItem : {};
      return formUtils.mapObjectToFields({
        ...policyDespatchAddress,
        preferredMailingAddress,
        preferredMailingAddressDetails:
          preferredMailingAddress === 'E' ? emailAddress : wholeAddress,
      });
    },
  })(ContactAddress)
);
