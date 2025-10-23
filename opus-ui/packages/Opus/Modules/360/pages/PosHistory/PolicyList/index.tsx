import React from 'react';
import lodash from 'lodash';
import PolicyItem from './item';
import { Collapse } from 'antd';
import Empty from '@/components/Empty';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import { tenant } from '@/components/Tenant';
import { formatDate } from '../../../_functions';
import Status from '../../../_component/Status';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

const { DataItem } = DataLayout;

export default ({ posHistoryList }: any) => {
  const historyGroupList = lodash
    .chain(posHistoryList)
    .groupBy('policyId')
    .map((item, key) => {
      const policyInfo = { policyId: key, mainProductCode: lodash.first(item)?.mainProductCode };
      return {
        policyInfo,
        policyList: item,
        policyId: key,
      };
    })
    .value();

  if (tenant.isTH())
    return (
      <>
        {!lodash.isEmpty(historyGroupList) ? (
          lodash.map(historyGroupList, (item, key) => (
            <div key={`${item?.policyId}-${key}`} className={styles.policyCard}>
              <Collapse bordered={false} defaultActiveKey={'pos'}>
                <Collapse.Panel
                  key={'pos'}
                  disabled={!item.policyList?.length}
                  showArrow={!!item.policyList?.length}
                  header={
                    <div className={styles.title}>
                      {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}
                      {item.policyInfo?.policyId}
                      {item.policyInfo?.mainProductCode &&
                        `(${formatMessageApi({ Label_BIZ_POS: 'baseProduct' })} ${formatMessageApi({
                          Dropdown_PRD_Product: item.policyInfo.mainProductCode,
                        })})`}
                    </div>
                  }
                >
                  {item.policyList?.map((policyItem, key) => (
                    <PolicyItem policyItem={policyItem} key={key} />
                  ))}
                </Collapse.Panel>
              </Collapse>
              {/*
                <List policyList={item.policyList} /> */}
            </div>
          ))
        ) : (
          <Empty />
        )}
      </>
    );

  return (
    <>
      {!lodash.isEmpty(historyGroupList) ? (
        lodash.map(historyGroupList, (item, key) => (
          <div key={`${item?.policyId}-${key}`} className={styles.policyCard}>
            <Collapse bordered={false} defaultActiveKey={'pos'}>
              <Collapse.Panel
                key={'pos'}
                disabled={!item.policyList?.length}
                showArrow={!!item.policyList.length}
                header={
                  <div className={styles.title}>
                    {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}
                    {item.policyInfo?.policyId}
                    {item.policyInfo?.mainProductCode &&
                      ` (${formatMessageApi({ Label_BIZ_POS: 'baseProduct' })} ${formatMessageApi({
                        Dropdown_PRD_Product: item.policyInfo.mainProductCode,
                      })})`}
                  </div>
                }
              >
                <>
                  {item.policyList?.map((policyItem, index) => (
                    <div key={index} className={styles.transactionItem}>
                      <DataLayout span={4} className={styles.row}>
                        <DataItem title={formatMessageApi({ Label_BIZ_SRV: 'TransactionType' })}>
                          {policyItem.transactionCode || ''}
                        </DataItem>
                        <DataItem title={t('transactionName')}>
                          {policyItem.transactionName}
                        </DataItem>
                        <DataItem title={t('transactionDate')}>
                          {formatDate(policyItem.transactionDate)}
                        </DataItem>
                        <DataItem title={t('transactionStatus')}>
                          <Status
                            type={'policyStatus'}
                            status={policyItem.transactionStatus}
                            typeCode={'Dropdown_POS_TransactionStatus'}
                          />
                        </DataItem>
                        <DataItem title={t('completionDate')}>
                          {formatDate(policyItem.completeDate)}
                        </DataItem>
                        <DataItem title={formatMessageApi({ Label_BIZ_POS: 'EffectiveDate' })}>
                          {formatDate(policyItem.effectiveDate)}
                        </DataItem>
                      </DataLayout>
                      <DataLayout span={4} justify={'start'} className={styles.row}>
                        <DataItem title={formatMessageApi({ Label_BIZ_POS: 'ApplyToCoverage' })}>
                          <ul>
                            {lodash.map(policyItem.applyToProductCodeList, item => (
                              <li key={item}>{`${item} ${formatMessageApi({ Dropdown_PRD_Product: item })}`}</li>
                            ))}
                          </ul>
                        </DataItem>
                        <DataItem title={formatMessageApi({ Label_BIZ_Policy: 'PolicySource' })}>
                          {policyItem.sourceSystem}
                        </DataItem>
                      </DataLayout>
                    </div>
                  ))}
                </>
              </Collapse.Panel>
            </Collapse>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
};
