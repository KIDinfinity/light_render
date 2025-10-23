import React from 'react';
import { Radio } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';
import lodash from 'lodash';

import BankInfoCard from './BankInfoCard';
import BankInfoSearchfield from './BankInfoSearchField';
import EmptyArray from '../EmptyArray';

import useGetRejected from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetRejected';
import useGetBankInfoList from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetBankInfoList';
import useGetSelectionBankId from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetSelectionBankId';
import useGetBankInfoListBySource from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetBankInfoListBySource';
import useHandleSelectBankInfo from 'opus/NewBusiness/PremiumSettlement/_hooks/useHandleSelectBankInfo';

import TaskStatus from 'enum/TaskStatus';
import RegionType from 'process/NB/Enum/RegionType';
import BankSource from 'process/NB/Enum/BankSource';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import styles from './index.less';

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

  const smartBankList = useGetBankInfoListBySource({ bankList, source: BankSource.SMART });
  // useSetBizData会把没有source的bank默认是BankSource.OWB
  const owbBankList = useGetBankInfoListBySource({ bankList, source: BankSource.OWB });
  const laBankList = useGetBankInfoListBySource({ bankList, source: BankSource.LA });

  // const restBankList = useGetBankInfoListBySource({
  //   bankList,
  //   filter: (source: BankSource) =>
  //     ![BankSource.SMART, BankSource.OWB, BankSource.LA].includes(source),
  // });

  const handleSelectBankInfo = useHandleSelectBankInfo({ bankList });

  return (
    <div onMouseLeave={equalKH ? undefined : triggerSearch} className={styles.bankInfoDiv}>
      <div
        className={classnames(styles.searchField, {
          [styles.hidden]: taskDetail.taskStatus === TaskStatus.completed || tenant.isTH(),
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
            disabled={taskNotEditable || (isRefundEditable ? false : rejected)}
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
                    disabled={
                      taskNotEditable || (isRefundEditable ? false : rejected) || bankInfo.lock
                    }
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
            disabled={taskNotEditable || (isRefundEditable ? false : rejected)}
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
                    disabled={
                      taskNotEditable || (isRefundEditable ? false : rejected) || bankInfo.lock
                    }
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
          <div className={styles.bankInfoTitle}>Bank information from Core</div>
        )}
        <div className={styles.laBankInfo}>
          <Radio.Group
            onChange={handleSelectBankInfo}
            value={selectedBank}
            disabled={taskNotEditable || (isRefundEditable ? false : rejected)}
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
                      disabled={
                        taskNotEditable || (isRefundEditable ? false : rejected) || bankInfo.lock
                      }
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
            ) : !tenant.isTH() ? (
              <EmptyArray
                handleAddBankInfo={handleAddBankInfo}
                emptySearchQuery={emptySearchQuery}
                taskNotEditable={taskNotEditable}
                isRefundEditable={isRefundEditable}
              />
            ) : null}
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default BankInfoSector;
