import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/corporateContactInfoField';

const AddressItem = ({ clientId, form, id }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} readOnly addressId={id} itemTable>
      <Fields.Businessaddress />
      <Fields.Zipcode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  addressItem: modelnamepsace.entities?.addressInfoMap?.[id],
  customerRole: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { addressItem } = props;
      return formUtils.mapObjectToFields({
        ...addressItem,
        businessAddress: addressItem.fullAddress,
      });
    },
  })(AddressItem)
);
