import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { useSelector, useDispatch } from 'dva';
import type { ContactModal, PayeeModal } from '../../../_dto/Models';
import ContactItem from './ContactItem';
import Panel from '../../../_components/Panel';

export interface IContact {
  payeeItem?: PayeeModal;
}

const ContactList: FunctionComponent<IContact> = ({ payeeItem }) => {
  const dispatch = useDispatch();

  const Dropdown_COM_CountryCode = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_COM_CountryCode
  );

  const countryCode =
    lodash
      .chain(Dropdown_COM_CountryCode)
      .find((el: any) => el.dictCode === tenant.region())
      .get('dictName')
      .value() || '';

  // useEffect(() => {
  //   if (countryCode && !lodash.isEmpty(countryCode)) {
  //     dispatch({
  //       type: 'paymentAllocation/initPayeeItem',
  //       payload: {
  //         payeeId: payeeItem?.id,
  //         countryCode,
  //       },
  //     });
  //   }
  // }, [countryCode]);

  return (
    <div>
      {lodash.map(payeeItem?.payeeContactList, (contact: ContactModal, index: number) => (
        <Panel.BackColor key={`${contact.id}-${index}`}>
          <ContactItem contactItem={contact} payeeItem={payeeItem} countryCode={countryCode} />
        </Panel.BackColor>
      ))}
    </div>
  );
};

export default ContactList;
