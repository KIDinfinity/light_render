import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import Item from './Item';
import TaxConsentList from './TaxConsentList';

const TaxConsent = ({ transactionId }: any) => {
  const taxConsent = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.taxConsent
  );

  return (
    <>
      {lodash.isEmpty(taxConsent) ? (
        <TaxConsentList transactionId={transactionId} />
      ) : (
        <Item transactionId={transactionId} />
      )}
    </>
  );
};
export default TaxConsent;
