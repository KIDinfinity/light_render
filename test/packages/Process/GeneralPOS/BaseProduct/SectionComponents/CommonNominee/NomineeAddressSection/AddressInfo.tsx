import React from 'react';
import { useDispatch } from 'dva';
import { Fields, FieldSection } from './Section';

const Item = ({ form, transactionId, clientIndex, formId }: any) => {
  const dispatch = useDispatch();
  return (
    <FieldSection
      icon={null}
      formId={formId}
      form={form}
      section="Nominee-Address"
      tableCollect={() => {}}
    >
      <Fields.AddressType transactionId={transactionId} clientIndex={clientIndex} />
      <Fields.CountryCode />
      <Fields.AddressLine1 />
      <Fields.AddressLine2 />
      <Fields.AddressLine3 />
      <Fields.AddressLine4 />
      <Fields.AddressLine5 />
      <Fields.ZipCode />
    </FieldSection>
  );
};

export default Item;
