import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import SubCard from '../../SubCard';
import MatchClientDetail from '../MatchClientDetail';
import {
  useJudgeAuthorisedSignatoryDisplay,
  useGetFullNameByClientInfo,
  useJudgeClientItemMisMatchClient,
  useJudgeClientItemFullyMatchClient,
  useGetMatchResultLabelCallback,
} from '../../_hooks';
import CustomerType from '../../CustomerType';
import CustomerRoleList from '../../CustomerRoleList';
import LAClientID from '../../LAClientID';
import useGetCustomerType from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

export default ({ item, policy, columnList }: any) => {
  const isShowASCard = useJudgeAuthorisedSignatoryDisplay();
  const getCleintName = useGetFullNameByClientInfo();
  const isMismatch = useJudgeClientItemMisMatchClient({ item });
  const isFullyMatch = useJudgeClientItemFullyMatchClient({ item });
  const handleGetMatchLabel = useGetMatchResultLabelCallback();
  return (
    <div className={styles.wrap}>
      <div className={styles.account}>
        <div className={styles.info}>
          {isFullyMatch && (
            <div className={styles.idNumber}>
              <LAClientID value={item?.identificationList?.[0]?.laClientId} />
            </div>
          )}
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
        {isShowASCard({ item }) && <SubCard policy={policy} columnList={columnList} />}
      </div>
    </div>
  );
};
