import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/contactInfoField';

const fieldConvertHandler = (addressType: string, data: any) => {
  const fieldMap = {
    C: ['currentAddress', 'currentZipCode'],
    B: ['businessAddress', 'businessZipCode'],
    R: ['residenceAddress', 'residenceZipCode'],
    I: ['identityAddress', 'identityZipCode'],
  };

  const fields = fieldMap[addressType];
  if (!fields) return data;
  const result = { currentAddress: '', currentZipCode: '' };
  result.currentAddress = data[fields?.[0]] || data.currentAddress;
  result.currentZipCode = data[fields?.[1]] || data.currentZipCode;
  return { ...data };
};

const ContactInfo = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} spanMode="dobule" readOnly />;
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  contactInfoKHData: modelnamepsace.entities.clientMap?.[clientId]?.contactInfoKH || {},
  addressType: modelnamepsace.defaultValueByCode?.addressType,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { contactInfoKHData, addressType } = props;
      const data = fieldConvertHandler(addressType, contactInfoKHData);
      return formUtils.mapObjectToFields(data);
    },
  })(ContactInfo)
);
