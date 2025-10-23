import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { ContactInformationFields } from '../Section';
import styles from './index.less';

const ContactInformation = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <Section
        form={form}
        editable={editable}
        section="paymentAllocation.contactInformation"
        formId={`paymentAllocation-${item?.id}`}
      >
        <ContactInformationFields.AddressKana />
        <ContactInformationFields.AddressKJ />
        <ContactInformationFields.ContactType />
        <ContactInformationFields.Email />
        <ContactInformationFields.PhoneNo />
        <ContactInformationFields.PostalCode />
        <ContactInformationFields.Sms />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, item, payeeId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveContact',
          payload: {
            changedFields,
            id: item?.id,
            payeeId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ContactInformation)
);
