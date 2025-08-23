import React from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { Popover } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import PolicyOwner from './policyOwner';
import BeneficiaryItem from './beneficiaryItem';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import { formatDate } from '../../../Utils';
import styles from './info.less';

const { DataItem } = DataLayout;

const concatName = (target: any) =>
  lodash
    .chain(target)
    .pick(['firstName', 'middleName', 'surname'])
    .values()
    .compact()
    .join('.')
    .value();

export default ({ info, layout = 6 }: any) => {
  const dispatch = useDispatch();
  const policyOwner = concatName(info?.policyOwner);
  const agent = concatName(info?.agent);
  const insured = concatName(info?.insured);
  const beneficiaryLayout = 24;
  const transactionLogPolicyNotesUrl = info?.transactionLogPolicyNotesUrl || '';
  const showPdType = () => {
    const { pdType, productInfoList } = info;
    if (pdType) {
      const type = ['R', 'T', 'E'];
      const type2 = ['A', 'B', 'C'];
      let text = '';
      if (type2.includes(pdType)) {
        if (productInfoList[0]?.cancerUnsecuredSign === '1') text = '3大疾病P免特約2（がん不担保）';
        else text = '3大疾病P免特約2';
      }
      if (type.includes(pdType)) text = '3大疾病P免特約';
      return (
        <DataItem className={styles.infoItem} title={'P免区分'}>
          {text}
        </DataItem>
      );
    } else return <DataItem />;
  };
  return (
    <>
      <DataLayout span={layout}>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'BenefitEffectiveDate' })}
        >
          {info?.issueEffectiveDate && formatDate(info?.issueEffectiveDate)}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'BenefitCessationDate' })}
        >
          {info?.riskCessationDate && formatDate(info?.riskCessationDate)}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'PolicyOwner' })}
        >
          {policyOwner && (
            <Popover
              placement="bottomLeft"
              content={<PolicyOwner concatName={concatName} policyOwner={info?.policyOwner} />}
            >
              <span className={styles.underLine}>{policyOwner}</span>
            </Popover>
          )}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'INS' })}
        >
          {insured}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Individual: 'RelationshipWithINS' })}
        >
          {formatMessageApi({
            Dropdown_CLM_Relationshipfor360: info?.policyOwner?.relationshipWithInsured,
          })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'AgentName' })}
        >
          {agent}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'AgentPhone' })}
        >
          {info?.agent?.phoneNo}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'PaymentMode' })}
        >
          {formatMessageApi({ Dropdown_POL_PaymentMode: info?.paymentMode })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'paymentMethod' })}
        >
          {formatMessageApi({ Dropdown_POL_PaymentMethod: info?.premiumPaymentMethod })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'PayToDate' })}
        >
          {info?.payToDate && formatDate(info?.payToDate)}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'Premiumamountfornexttime' })}
        >
          {info?.nextClaimPremium}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'PremiumStatus' })}
        >
          {formatMessageApi({ Dropdown_POL_PremiumStatus: info?.premiumStatus })}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'Transactionstatus' })}
        >
          {info?.transactionStatus}
        </DataItem>
        <DataItem
          className={styles.infoItem}
          title={formatMessageApi({ Label_BIZ_Policy: 'Policy Notice' })}
        >
          {transactionLogPolicyNotesUrl && (
            <a
              href={transactionLogPolicyNotesUrl}
              target="_blank"
              className={styles.policyNotice}
              onClick={() => {
                tarckInquiryPoint(dispatch, {
                  eventName: eEventName.policyNotice,
                  eventOperation: eEventOperation.viewDetail,
                });
              }} rel="noreferrer"
            >
              Trans.Log/Policy Notes
            </a>
          )}
        </DataItem>
        {showPdType()}
        <DataItem />
      </DataLayout>
      <DataLayout span={beneficiaryLayout}>
        <DataItem
          className={classnames({
            [styles.infoItem]: true,
            [styles.marB4]: true,
          })}
          title={formatMessageApi({ Label_BIZ_Policy: 'beneficiaryInfo' })}
        >
          {lodash.size(info?.beneficiaryList) > 0 && (
            <div className={styles.beneficiaryItem}>
              <BeneficiaryItem beneficiaryList={info?.beneficiaryList} />
            </div>
          )}
        </DataItem>
      </DataLayout>
    </>
  );
};
