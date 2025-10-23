import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/corporateContactInfoField';

const AddressItem = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      addressId={id}
      itemTable
      condition="proposal"
    >
      <Fields.AddressType />
      <Fields.Address7 />
      <Fields.Address6 />
      <Fields.Address5 />
      <Fields.Address4 />
      <Fields.Address3 />
      <Fields.Address2 />
      <Fields.Address1 />
      <Fields.Zipcode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  addressItem: modelnamepsace.modalData.entities?.addressInfoMap?.[id],
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, id, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveAddressInfoList',
          payload: {
            changedFields,
            id: clientId,
            addressId: id,
            errorId: clientId + '_' + id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { addressItem } = props;
      return formUtils.mapObjectToFields(addressItem);
    },
  })(AddressItem)
);
