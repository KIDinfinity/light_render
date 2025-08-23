import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import TableItem from './TableItem';
import styles from './index.less';

const TaxConsentList = ({ transactionId }: any) => {
  const taxConsentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.taxConsentList
  );

  return (
    <div className={styles.taxConsentList}>
      {lodash.map(taxConsentList, (item, index) => (
        <TableItem transactionId={transactionId} dateItem={item} index={index} />
      ))}
      {lodash.isEmpty(taxConsentList) && <TableItem index={0} transactionId={transactionId} />}
    </div>
  );
};
export default TaxConsentList;
