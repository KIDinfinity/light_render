import React from 'react';
import classnames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import ContactInfoTableSection from './ContactInfo-Table';
import ContactInfoFieldSection from './ContactInfo-Field/Edit';
import ContactInfoAddressFieldSection from './ContactInfo-Field/AddressEdit';
import styles from './edit.less';

export default ({ id, item }: any) => {
  const regionCode = tenant.region();
  return (
    <>
      <ContactInfoAddressFieldSection id={id} item={item} />

      <div
        className={classnames(styles.container, {
          [styles.extraContainer]: regionCode === Region.PH,
        })}
      >
        {regionCode !== Region.KH && <ContactInfoTableSection id={id} />}
      </div>
      <ContactInfoFieldSection id={id} item={item} />
    </>
  );
};
