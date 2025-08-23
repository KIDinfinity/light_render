import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import SubCard from 'process/NB/CustomerIdentification/SubCard';
import MatchClientDetail from 'process/NB/CustomerIdentification/MatchClients/MatchClientDetail';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/CustomerIdentification/_hooks/useJudgeAuthorisedSignatoryDisplay';
import useGetFullNameByClientInfo from 'process/NB/CustomerIdentification/_hooks/useGetFullNameByClientInfo';
import useJudgeClientItemMisMatchClient from 'process/NB/CustomerIdentification/_hooks/useJudgeClientItemMisMatchClient';
import useJudgeClientItemFullyMatchClient from 'process/NB/CustomerIdentification/_hooks/useJudgeClientItemFullyMatchClient';
import useGetMatchResultLabelCallback from 'process/NB/CustomerIdentification/_hooks/useGetMatchResultLabelCallback';
import CustomerType from 'process/NB/CustomerIdentification/CustomerType';
import CustomerRoleList from 'process/NB/CustomerIdentification/CustomerRoleList';
import LAClientID from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Show/ApplicationIdentity/LAClientID';

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
        {isShowASCard({ item }) && <SubCard policy={policy} columnList={columnList} />}
      </div>
    </div>
  );
};
