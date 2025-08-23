import React from 'react';
import classnames from 'classnames';
import {
  useGetFullNameByClientInfo,
  useJudgeClientItemMisMatchClient,
  useJudgeClientItemFullyMatchClient,
  useGetMatchResultLabelCallback,
} from '../../_hooks';
import MatchClientDetail from '../../MatchClients/MatchClientDetail';
import CustomerType from '../../CustomerType';
import CustomerRoleList from '../../CustomerRoleList';
import styles from './index.less';
import useGetCustomerType from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

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
          <CustomerType customerType={useGetCustomerType(item)} />
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
