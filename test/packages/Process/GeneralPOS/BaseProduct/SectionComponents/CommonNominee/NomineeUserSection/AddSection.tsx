import React from 'react';
import { FieldSection, Fields } from './Section';
import { Form } from 'antd';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const AddSection = ({ form, transactionId, addHandle, formId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return editable ? (
    <FieldSection
      icon="user"
      formId={formId}
      transactionId={transactionId}
      form={form}
      editable={editable}
      section="Nominee-User"
    >
      <Fields.FirstName isAdd addHandle={addHandle} />
      <Fields.MiddleName isAdd addHandle={addHandle} />
      <Fields.Surname isAdd addHandle={addHandle} />
    </FieldSection>
  ) : (
    <></>
  );
};

export default Form.create()(AddSection);
