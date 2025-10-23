import { tenant } from '@/components/Tenant';
import React from 'react';
import AddressInfo from './AddressInfo';
import ContactInfo from './ContactInfo';
import Occupation from './Occupation';
import UserInfo from './UserInfo';

const EditItem = ({ transactionId, clientSeq, clientIndex }: any) => {
  return (
    <div>
      <UserInfo transactionId={transactionId} clientSeq={clientSeq} clientIndex={clientIndex} />
      {tenant.isMY() && (
        <>
          <AddressInfo
            transactionId={transactionId}
            clientSeq={clientSeq}
            clientIndex={clientIndex}
          />
          <Occupation
            transactionId={transactionId}
            clientSeq={clientSeq}
            clientIndex={clientIndex}
          />
          <ContactInfo
            transactionId={transactionId}
            clientSeq={clientSeq}
            clientIndex={clientIndex}
          />
        </>
      )}
    </div>
  );
};
EditItem.displayName = 'content';
export default EditItem;
