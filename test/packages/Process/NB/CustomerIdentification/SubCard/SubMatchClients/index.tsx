import React from 'react';
import classnames from 'classnames';
import useGetFullNameByClientInfo from 'process/NB/CustomerIdentification/_hooks/useGetFullNameByClientInfo';
import MatchClientDetail from 'process/NB/CustomerIdentification/MatchClients/MatchClientDetail';
import CustomerType from 'process/NB/CustomerIdentification/CustomerType';
import CustomerRoleList from 'process/NB/CustomerIdentification/CustomerRoleList';
import useJudgeClientItemMisMatchClient from 'process/NB/CustomerIdentification/_hooks/useJudgeClientItemMisMatchClient';
import useJudgeClientItemFullyMatchClient from 'process/NB/CustomerIdentification/_hooks/useJudgeClientItemFullyMatchClient';
import useGetMatchResultLabelCallback from 'process/NB/CustomerIdentification/_hooks/useGetMatchResultLabelCallback';
import styles from './index.less';

export default ({ item, columnList }: any) => {
  const isMismatch = useJudgeClientItemMisMatchClient({ item });
  const isFullyMatch = useJudgeClientItemFullyMatchClient({ item });
  const handleGetMatchLabel = useGetMatchResultLabelCallback();
  const getCleintName = useGetFullNameByClientInfo();

  return (
    <div className={styles.wrap} key={item?.id}>
      <div className={styles.account}>
        <div className={styles.info}>
          <div className={styles.userName}>{getCleintName({ clientInfo: item })}</div>
          <CustomerRoleList roleList={item?.roleList} />
          <CustomerType customerType={item.customerType} />
        </div>
      </div>
      <div className={styles.tag}>
        <div
          className={classnames({
            [styles.matchTag]: true,
            [styles.misMatchTag]: isMismatch,
            [styles.fullyMatchTag]: isFullyMatch,
          })}
        >
          {handleGetMatchLabel({ item })}
        </div>
      </div>
      <div className={styles.ClientsDetail}>
        <MatchClientDetail item={item} columnList={columnList} />
      </div>
    </div>
  );
};
