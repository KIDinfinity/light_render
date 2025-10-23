import React from 'react';
import { Radio } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';
import TaskStatus from 'enum/TaskStatus';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import styles from './index.less';
import lodash from 'lodash';
import useGetBankInfoList from 'process/NB/PremiumSettlement/_hooks/useGetBankInfoList';
import BankInfoCard from './BankInfoCard';
import BankInfoSearchfield from './BankInfoSearchField';
import useGetLaBankInfoList from 'process/NB/PremiumSettlement/_hooks/useGetLaBankInfoList';
import useGetSelectionBankId from 'process/NB/PremiumSettlement/_hooks/useGetSelectionBankId';
import useGetOWBBankInfoList from 'process/NB/PremiumSettlement/_hooks/useGetOWBBankInfoList';
import useGetSmartBankInfoList from 'process/NB/PremiumSettlement/_hooks/useGetSmartBankInfoList';
import useHandleSelectBankInfo from 'process/NB/PremiumSettlement/_hooks/useHandleSelectBankInfo';
import { tenant } from '@/components/Tenant';
import RegionType from 'process/NB/Enum/RegionType';
import EmptyArray from '../EmptyArray';

const BankInfoSector = () => {
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
  const {
    bankList,
    handleSearchQuery,
    triggerSearch,
    handleAddBankInfo,
    searchQuery,
    timeQuery,
    filterQuery,
    emptySearchQuery,
  } = useGetBankInfoList();
  const selectedBank = useGetSelectionBankId({ bankList });
  const rejected = useGetRejected();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isRefundEditable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.refundEditable
  );
  const equalKH = lodash.isEqual(tenant.region(), RegionType.KH);

  const smartBankList = useGetSmartBankInfoList({ bankList });
  const owbBankList = useGetOWBBankInfoList({ bankList });
  const laBankList = useGetLaBankInfoList({ bankList });
  const handleSelectBankInfo = useHandleSelectBankInfo({ bankList });

  return (
    <div onMouseLeave={equalKH ? undefined : triggerSearch} className={styles.bankInfoDiv}>
      <div
        className={classnames(styles.searchField, {
          [styles.hidden]: taskDetail.taskStatus === TaskStatus.completed,
        })}
      >
        <BankInfoSearchfield
          handleCallback={handleSearchQuery}
          searchQuery={{
            ...filterQuery,
            ...timeQuery,
            bankAcctName: searchQuery ?? '',
          }}
        />
      </div>

      <div className={styles.bankRadioHolderKh}>
        <div
          className={classnames({
            [styles.hidden]: !owbBankList?.length,
          })}
        >
          <Radio.Group
            onChange={handleSelectBankInfo}
            value={selectedBank}
            disabled={rejected || taskNotEditable || !isRefundEditable}
          >
            {owbBankList.map((bankInfo, index) => {
              return (
                <>
                  <Radio
                    key={bankInfo?.id ?? `bankInfo-${index}`}
                    value={bankInfo?.id}
                    className={
                      styles[
                        index === 0 && bankInfo?.isNew
                          ? 'bankRadioBannerActive'
                          : 'bankRadioBannerInactive'
                      ]
                    }
                    disabled={rejected || taskNotEditable || bankInfo.lock}
                  >
                    <BankInfoCard
                      key={bankInfo?.bankCode ?? `bankInfoCard-${index}`}
                      isSelected={bankInfo.id === selectedBank}
                      bankSectionData={bankInfo}
                      bankInfoIndex={bankInfo.index}
                      id={bankInfo?.id}
                    />
                  </Radio>
                </>
              );
            })}
          </Radio.Group>
        </div>
        <div
          className={classnames({
            [styles.hidden]: !smartBankList.length,
          })}
        >
          {equalKH && <div className={styles.bankInfoTitle}>Bank information from Smart</div>}
          <Radio.Group
            onChange={handleSelectBankInfo}
            value={selectedBank}
            disabled={rejected || taskNotEditable || !isRefundEditable}
          >
            {smartBankList.map((bankInfo, index) => {
              return (
                <>
                  <Radio
                    key={bankInfo?.id ?? `bankInfo-${index}`}
                    value={bankInfo?.id}
                    className={
                      styles[
                        index === 0 && bankInfo?.isNew
                          ? 'bankRadioBannerActive'
                          : 'bankRadioBannerInactive'
                      ]
                    }
                    disabled={rejected || taskNotEditable || bankInfo.lock}
                  >
                    <BankInfoCard
                      key={bankInfo?.bankCode ?? `bankInfoCard-${index}`}
                      isSelected={bankInfo.id === selectedBank}
                      bankSectionData={bankInfo}
                      bankInfoIndex={bankInfo.index}
                      id={bankInfo?.id}
                    />
                  </Radio>
                </>
              );
            })}
          </Radio.Group>
        </div>
        {lodash.isArray(laBankList) && laBankList.length > 0 && (
          <div className={styles.bankInfoTitle}>Bank information from LA</div>
        )}
        <div className={styles.laBankInfo}>
          <Radio.Group
            onChange={handleSelectBankInfo}
            value={selectedBank}
            disabled={rejected || taskNotEditable || !isRefundEditable}
          >
            {(lodash.isArray(laBankList) && laBankList.length > 0) || bankList.length > 0 ? (
              laBankList.map((bankInfo, index) => {
                return (
                  <>
                    <Radio
                      key={bankInfo?.id ?? `bankInfo-${index}`}
                      value={bankInfo?.id}
                      className={
                        styles[
                          index === 0 && bankInfo?.isNew
                            ? 'bankRadioBannerActive'
                            : 'bankRadioBannerInactive'
                        ]
                      }
                      disabled={rejected || taskNotEditable || bankInfo.lock}
                    >
                      <BankInfoCard
                        key={bankInfo?.bankCode ?? `bankInfoCard-${index}`}
                        isSelected={bankInfo.id === selectedBank}
                        bankSectionData={bankInfo}
                        bankInfoIndex={bankInfo.index}
                        id={bankInfo?.id}
                        disabled={true}
                      />
                    </Radio>
                  </>
                );
              })
            ) : (
              <EmptyArray
                handleAddBankInfo={handleAddBankInfo}
                emptySearchQuery={emptySearchQuery}
                taskNotEditable={taskNotEditable}
                isRefundEditable={isRefundEditable}
              />
            )}
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default BankInfoSector;
