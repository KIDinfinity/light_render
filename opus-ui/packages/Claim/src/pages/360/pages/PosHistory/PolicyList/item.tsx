import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import Tiemline360 from 'claim/pages/360/_component/TimeLine';
import { formatDate } from '../../../_functions';
import TextWrap from '../../../_component/TextWrap';
import styles from './item.less';
import { ReferenceModel } from 'claim/pages/360/enum';
import useGetReferenceModel from 'claim/components/ReferenceModelProvider/hooks/useGetReferenceModel';

const { DataItem } = DataLayout;

const mapProduct = (codeList: any) => {
  return (
    <ul>
      {lodash.map(codeList, (item, index: number) => (
        <li key={`${item}-${index}`}>{`${item} - ${formatMessageApi({
          Dropdown_PRD_Product: item,
        })}`}</li>
      ))}
    </ul>
  );
};

const RenderItem = (
  activeKey: any,
  transactionDate: any,
  index: any,
  callback: any,
  transactionCode: any,
  transactionName: any,
  transactionStatus: any,
  applyToProductCodeList: any,
  completeDate: any,
  effectiveDate: any,
  referenceModel: any
) => {
  const isSummaryPageModel = referenceModel === ReferenceModel.SummaryPage;
  if (isSummaryPageModel) {
    return (
      <div className={styles.blackBg}>
        <Tiemline360
          activeKey={activeKey}
          title={transactionDate}
          index={index}
          callback={callback}
        >
          <div className={styles.transactionItem}>
            <div className={styles.HeaderData}>{formatDate(transactionDate)}</div>
            {transactionCode && (
              <div className={styles.alter}>
                {formatMessageApi({ Dropdown_CLM_TransTypefor360: transactionCode })}
              </div>
            )}
            {transactionName && <div className={styles.alter}>{transactionName}</div>}
            <DataLayout className={styles.transaction} span={24}>
              <TextWrap.Grey className={styles.transStatusTitle}>
                {formatMessageApi({ Label_BIZ_POS: 'TransStatus' })}
              </TextWrap.Grey>
              <TextWrap.White className={styles.transStatus}>
                {formatMessageApi({ Dropdown_POS_TransactionStatus: transactionStatus })}
              </TextWrap.White>
            </DataLayout>
            <DataLayout className={styles.transaction} span={24}>
              <DataItem title={formatMessageApi({ Label_BIZ_POS: 'ApplyToCoverage' })}>
                {mapProduct(applyToProductCodeList)}
              </DataItem>
            </DataLayout>
            <DataLayout className={styles.transaction} span={12}>
              <DataItem
                title={formatMessageApi({
                  Label_BIZ_Claim: 'venus.navigator.label.completed-time',
                })}
              >
                {completeDate && formatDate(completeDate)}
              </DataItem>
              <DataItem title={formatMessageApi({ Label_BIZ_POS: 'EffectiveDate' })}>
                {effectiveDate && formatDate(effectiveDate)}
              </DataItem>
            </DataLayout>
          </div>
        </Tiemline360>
      </div>
    );
  }
  return (
    <Tiemline360 activeKey={activeKey} title={transactionDate} index={index} callback={callback}>
      <div className={styles.transactionItem}>
        <div className={styles.HeaderData}>{formatDate(transactionDate)}</div>
        {transactionCode && (
          <div className={styles.alter}>
            {formatMessageApi({ Dropdown_CLM_TransTypefor360: transactionCode })}
          </div>
        )}
        {transactionName && <div className={styles.alter}>{transactionName}</div>}
        <DataLayout className={styles.transaction} span={12}>
          <DataItem title={formatMessageApi({ Label_BIZ_POS: 'TransStatus' })}>
            {formatMessageApi({ Dropdown_POS_TransactionStatus: transactionStatus })}
          </DataItem>
          <DataItem title={formatMessageApi({ Label_BIZ_POS: 'EffectiveDate' })}>
            {effectiveDate && formatDate(effectiveDate)}
          </DataItem>
        </DataLayout>
        <DataLayout className={styles.transaction} span={12}>
          <DataItem
            title={formatMessageApi({ Label_BIZ_Claim: 'venus.navigator.label.completed-time' })}
          >
            {completeDate && formatDate(completeDate)}
          </DataItem>
        </DataLayout>
        <DataLayout className={styles.transaction} span={24}>
          <DataItem title={formatMessageApi({ Label_BIZ_POS: 'ApplyToCoverage' })}>
            {mapProduct(applyToProductCodeList)}
          </DataItem>
        </DataLayout>
      </div>
    </Tiemline360>
  );
};

export default ({ activeKey, index, callback, policyItem }: any) => {
  const {
    applyToProductCodeList,
    effectiveDate,
    transactionDate,
    transactionStatus,
    transactionCode,
    completeDate,
    transactionName,
  } = lodash.pick(policyItem, [
    'applyToProductCodeList',
    'effectiveDate',
    'transactionDate',
    'transactionStatus',
    'transactionCode',
    'completeDate',
    'transactionName',
  ]);
  const referenceModel = useGetReferenceModel();
  return RenderItem(
    activeKey,
    transactionDate,
    index,
    callback,
    transactionCode,
    transactionName,
    transactionStatus,
    applyToProductCodeList,
    completeDate,
    effectiveDate,
    referenceModel
  );
};
