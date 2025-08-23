import React from 'react';
import { Fields, TableSection } from './Section';

const ContactInfo = ({ form, formId, ...res }: any) => {
  return (
    <TableSection icon={null} formId={formId} form={form} section="Nominee-Contact" {...res}>
      <Fields.ContactType {...res} />
      <Fields.ContactDisplayName {...res} />
      <Fields.ContactNo {...res} />
    </TableSection>
  );
};

export default ContactInfo;
