import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="CustomerInfo">
      <Fields.Age />
      <Fields.DateofBirth />
      <Fields.Gender />
      <Fields.IDExpiryDate />
      <Fields.IdentityNo />
      <Fields.IdentityType />
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
    const { info } = props;

    return formUtils.mapObjectToFields({ ...info, CtfPlace: info?.placeOfBirth });
  },
})(Item);
