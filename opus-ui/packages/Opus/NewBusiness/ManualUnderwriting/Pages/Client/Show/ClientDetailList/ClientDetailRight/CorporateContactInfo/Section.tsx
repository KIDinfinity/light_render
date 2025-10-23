import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import styles from './index.less';
import useGetAddressIdByType from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetAddressIdByType';
import { AddressType, ContactType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import useGetContactIdByType from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetContactIdByType';

interface IProps {
  clientId: string;
}

export default ({ clientId }: IProps) => {
  const addressId = useGetAddressIdByType({
    clientId,
    mode: 'show',
    type: AddressType.Business,
  });
  const contactId = useGetContactIdByType({
    clientId,
    mode: 'show',
    type: ContactType.Office,
  });

  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;

  return (
    <div className={styles.addressContainer}>
      <div className={styles.infoWrap}>
        <AddressSection clientId={clientId} id={addressId} />
        {expand && <ContactSection clientId={clientId} id={contactId} />}
      </div>
    </div>
  );
};
