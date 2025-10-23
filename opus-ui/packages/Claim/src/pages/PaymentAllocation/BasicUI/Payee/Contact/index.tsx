import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import type { ContactModal } from '../../../_dto/Models';
import ContactItem from './ContactItem';
import Panel from '../../../_components/Panel';

export interface IContact {
  payeeContactList?: ContactModal[];
}

const ContactList: FunctionComponent<IContact> = ({ payeeContactList }) => {
  return (
    <div>
      {lodash.map(payeeContactList, (contact: ContactModal, index: number) => (
        <Panel.BackColor key={`${contact.id}-${index}`}>
          <ContactItem contactItem={contact} />
        </Panel.BackColor>
      ))}
    </div>
  );
};

export default ContactList;
