import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { BusinessCode } from 'claim/enum/BusinessCode';
import styles from './index.less';
import lodash from 'lodash';
import Section from '../../../../_component/Section/index';
import MIBSection from './MIBSection';
import BeneficiaryList from './BeneficiaryList';
import classNames from 'classnames';
import MIBTagList from 'opus/Modules/360/_component/MIBTagList';
import Exclusion from '../Product/Exclusion';

const getName = (ppl) => lodash.compact([ppl?.firstName, ppl?.middleName, ppl?.surname])?.join(' ');

const transConfig = {
  riskCommenceDate: { type: 'date' },
  payToDate: { type: 'date' },
  riskStatus: { type: 'status' },
  premiumStatus: { type: 'status' },
  issueEffectiveDate: { type: 'date' },
  cashValue: {
    type: 'currency',
    currencyField: 'billingCurrency',
  },
  premiumAmount: {
    type: 'currency',
    currencyField: 'billingCurrency',
  },
  paidPremium: {
    type: 'currency',
    currencyField: 'billingCurrency',
  },
  nextClaimPremium: {
    type: 'currency',
    currencyField: 'billingCurrency',
  },
  agent: {
    render: ({ value }) => getName(value),
  },
  mainProduct: {
    type: 'pair',
    codeField: 'mainProductCode',
    nameField: 'mainProductName',
  },
  impairmentCodeList: {
    render: ({ content }: any) => {
      return <MIBTagList impairmentCodeList={content} />;
    },
  },
};

export default function Header({ item, isActive }: any) {
  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  const { pdType, productInfoList, mainProductCode, policyExclusionList } = item;

  const filteredExclusionList = policyExclusionList?.filter(
    (exclusion: any) => exclusion?.productCode === mainProductCode
  );

  const showExclusionList = !!filteredExclusionList?.length;

  let pdText = '';
  if (pdType) {
    const type = ['R', 'T', 'E'];
    const type2 = ['A', 'B', 'C'];

    if (type2.includes(pdType)) {
      if (productInfoList[0]?.cancerUnsecuredSign === '1') pdText = '3大疾病P免特約2（がん不担保）';
      else pdText = '3大疾病P免特約2';
    }
    if (type.includes(pdType)) pdText = '3大疾病P免特約';

    if (['085', '086', '087'].includes(mainProductCode)) {
      pdText = '保険料の払込免除';
    }
  }

  return (
    <div className={styles.policyContainer}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.policy-information',
        })}
      </div>
      <Section
        sectionId={'Policy'}
        transConfig={transConfig}
        data={{
          ...item,
          policyOwnerName: getName(item?.policyOwner),
          insuredName: getName(item?.insured),
          pdType: pdText,
        }}
      />
      <div
        className={classNames(styles.mibContainer, {
          [styles.hidden]: !(
            lodash.isArray(item.policyMibInfoList) && !lodash.isEmpty(item.policyMibInfoList)
          ),
        })}
      >
        <MIBSection data={item.policyMibInfoList} />
      </div>
      {showExclusionList && <Exclusion exclusionList={filteredExclusionList} />}
      {businessCode === BusinessCode.claim && !!item.beneficiaryList?.length && (
        <BeneficiaryList beneficiaryList={item.beneficiaryList} isActive={isActive} />
      )}
      {/* <div className={styles.header}>
        <div className={styles.policyNo}>{}</div>
        {item?.policySource && (
          <span className={styles.individual}>
            {formatMessageApi({ PolicyType: item?.policySource })}
          </span>
        )}
        {item?.riskStatus && (
          <span className={styles.individual}>
            {formatMessageApi({ risk_status: item?.riskStatus })}
          </span>
        )}
      </div>
      <div className={styles.schema}>
        <div className={classNames(styles.detail, { [styles.expander]: isExpanderSwitchOn })}>
          <div className={styles.PolicyNoCode}>{item?.policyId}</div>
          {!!item?.internalPolicyId && (
            <div>{`(Internal Policy No.${item?.internalPolicyId})`}</div>
          )}
        </div>
        <div className={styles.insurancecompany}>

        </div>
        {!tenant.isJP() && item?.issueEffectiveDate && item?.riskCessationDate && (
          <div>{`${formatDate(item?.issueEffectiveDate)} ~ ${formatDate(
            item?.riskCessationDate
          )}`}</div>
        )}
      </div> */}
      {/* <Info item={item} /> */}
    </div>
  );
}
