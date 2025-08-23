import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import type { ContactModal, PayeeModal } from '../../../_dto/Models';
import ContactItem from './ContactItem';
import Panel from '../../../_components/Panel';

export interface IContact {
  payeeItem?: PayeeModal;
}

const ContactList: FunctionComponent<IContact> = ({ payeeItem }) => {
  return (
    <div>
      {lodash.map(payeeItem?.payeeContactList, (contact: ContactModal, index: number) => (
        <Panel.BackColor key={`${contact.id}-${index}`}>
          <ContactItem contactItem={contact} payeeItem={payeeItem} />
        </Panel.BackColor>
      ))}
    </div>
  );
};

export default ContactList;
