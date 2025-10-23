import { useSelector } from 'dva';
                import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import styles from './index.less';
import Item from './Item';

interface IProps {
  transactionId: string;
}

const Show = ({ transactionId }: IProps) => {
  const clientInfoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList;
  }, shallowEqual);
  const identificationClientResultList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.transactionTypesMap?.[transactionId]
      ?.identificationClientResultList;
  }, shallowEqual);

  return (
    <div className={styles.nomineeList}>
      {lodash.map(clientInfoList, (clientInfo: any, clientIndex: number) => {
        return (
          <div key={clientInfo?.clientSeq} className={styles.showItem}>
            <Item
              transactionId={transactionId}
              clientIndex={clientIndex}
              identificationClientResult={identificationClientResultList?.find(
                (item) => item?.clientSeq === clientInfo?.clientSeq
              )}
              clientInfo={clientInfo}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Show;
