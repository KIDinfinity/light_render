import React from 'react';
import { Form } from 'antd';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PayorInfo">
      <Fields.Age />
      <Fields.DateofBirth />
      <Fields.Gender />
      <Fields.IDExpiryDate />
      <Fields.IdentityNo />
      <Fields.IdentityType />
      <Fields.Name />
      <Fields.PhoneNo />
      <Fields.Role />
      <Fields.OccupationCode />
      <Fields.MaritalStatus />
      <Fields.Email />
      <Fields.PlaceOfBirth />
      <Fields.Nationality />
      <Fields.HomeNo />
      <Fields.WorkNo />
    </Section>
  );
};

export default Form.create({
  onFieldsChange() {},
  mapPropsToFields(props: any) {
    const { info, contactInfo } = props;

    return formUtils.mapObjectToFields({ ...info, CtfPlace: info?.placeOfBirth });
  },
})(Item);
