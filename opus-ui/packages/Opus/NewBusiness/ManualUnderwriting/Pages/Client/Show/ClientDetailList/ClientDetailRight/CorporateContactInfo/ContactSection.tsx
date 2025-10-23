import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/corporateContactInfoField';

const ContactItem = ({ clientId, form, id }: any) => {
  return (
    <Section
      form={form}
      editable={false}
      clientId={clientId}
      readOnly
      contactId={id}
      itemTable
      icon=""
    >
      <Fields.Contacttype />
      <Fields.Countrycode />
      <Fields.Contactno />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  item: modelnamepsace.entities.contactInfoMap?.[id],
  customerRole: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields({
        ...item,
      });
    },
  })(ContactItem)
);
