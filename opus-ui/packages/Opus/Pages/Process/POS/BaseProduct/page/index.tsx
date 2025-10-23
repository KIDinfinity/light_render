import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';
import PolicyInfo from '../SectionComponents/PolicyInfo';
import lodash from 'lodash';
import Add from '../SectionComponents/TransactionInfo/Add';
import TransactionInfo from '../SectionComponents/TransactionInfo';
const pageSelector = ({ [NAMESPACE]: modelnamepsace, processTask }: any) => {
  return {
    transactionTypes: modelnamepsace.processData?.transactionTypes,
    transactionTypesMap: modelnamepsace.entities?.transactionTypesMap,
  };
};

export default function Index() {
  const dispatch = useDispatch();
  const { transactionTypes, transactionTypesMap } = useSelector(pageSelector, shallowEqual);

  return (
    <div>
      <PolicyInfo transactionId={transactionTypes?.[0]} />
      {lodash.compact(transactionTypes).map((transactionId: any, index) => {
        const transactionTypeCode = formUtils.queryValue(
          transactionTypesMap?.[transactionId]?.transactionTypeCode
        );

        return (
          <div key={transactionId}>
            <TransactionInfo
              transactionId={transactionId}
              transactionTypeCode={transactionTypeCode}
              notCft={true}
              key={transactionId}
            />
          </div>
        );
      })}
      {lodash.compact(transactionTypes).length < 1 && (
        <div className={styles.servicingRequestInfoAdd}>
          <Add />
        </div>
      )}
    </div>
  );
}
