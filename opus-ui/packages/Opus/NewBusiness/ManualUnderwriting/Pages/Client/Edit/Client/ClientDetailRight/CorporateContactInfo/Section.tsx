import React from 'react';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import styles from './index.less';
import useDefaultAddAddress from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useDefaultAddAddress';
import useGetAddressIdByType from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetAddressIdByType';
import { AddressType, ContactType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import useGetContactIdByType from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetContactIdByType';
import useDefaultAddContact from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useDefaultAddContact';

interface IProps {
  clientId: string;
}

export default ({ clientId }: IProps) => {
  useDefaultAddAddress({ clientId, type: AddressType.Business });
  useDefaultAddContact({ clientId, type: ContactType.Office });

  const addressId = useGetAddressIdByType({
    clientId,
    mode: 'edit',
    type: AddressType.Business,
  });
  const contactid = useGetContactIdByType({
    clientId,
    mode: 'edit',
    type: ContactType.Office,
  });

  return (
    <div className={styles.addressContainer}>
      <div className={styles.infoWrap}>
        {!!addressId && <AddressSection clientId={clientId} id={addressId} />}
        {!!contactid && <ContactSection clientId={clientId} id={contactid} />}
      </div>
    </div>
  );
};
