import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionCard from './SectionCard';
import PaymentMethod from './PaymentMethod';
import { formUtils } from 'basic/components/Form';
import PayoutCurrency from './PayoutCurrency';
import classnames from 'classnames';

const PaymentRow = ({ children, className }) => {
  return (
    <div className={classnames(styles.payeePayoutRow, className)}>
      <div className={styles.paymentRowLeft}>{children[0]}</div>
      {children[1]}
    </div>
  );
};

export default () => {
  const {
    payeeList,
    policyOwnerList = [],
    policyInsuredList = [],
    policyBeneficiaryList = [],
    policyBenefitList = [],
  } = useSelector(({ paymentAllocation }: any) => paymentAllocation.claimData) || {};

  // 获取当前payee总的payout金额
  const getTotalPayoutAmount = ({ id: payeeId }: any) => {
    return lodash.reduce(
      policyBenefitList,
      (totalPayoutAmount: number, { beneficiaryList = [] }: any) => {
        const beneficiaryItem = lodash.find(beneficiaryList, { payeeId }) || {};
        return lodash.isEmpty(beneficiaryItem)
          ? totalPayoutAmount
          : totalPayoutAmount + formUtils.queryValue(beneficiaryItem.beneficiaryAmount);
      },
      0
    );
  };

  // 获取当前payee的payout详情
  const getPaymentRow = ({ id: payeeId, payoutCurrency }: any) => {
    const list = lodash.reduce(
      policyBenefitList,
      (arr: any, { beneficiaryList = [] }: any) => {
        const beneficiaryItem = lodash.find(beneficiaryList, { payeeId }) || {};

        return lodash.isEmpty(beneficiaryItem) ? arr : [...arr, beneficiaryItem];
      },
      []
    );
    return list.map(({ policyNo, beneficiaryAmount }: any) => (
      <PaymentRow key={policyNo} className={styles.solidWhite}>
        {policyNo || ''}
        {`${formUtils.queryValue(beneficiaryAmount)?.toFixed(2) || 0} ${payoutCurrency || ''}`}
      </PaymentRow>
    ));
  };

  return (
    <div className={styles.card}>
      {payeeList?.map((payee) => {
        return (
          <div className={styles.payeeCard} key={payee.id}>
            <div className={styles.payeeLeft}>
              <div className={styles.payeeName}>
                {lodash
                  .compact(
                    [payee.firstName, payee.middleName, payee.surname].map((data) =>
                      formUtils.queryValue(data)
                    )
                  )
                  .join(' ')}
              </div>
              {[
                {
                  list: policyOwnerList,
                  code: 'PolicyOwner',
                },
                {
                  list: policyInsuredList,
                  code: 'PolicyInsured',
                },
                {
                  list: policyBeneficiaryList,
                  code: 'Beneficiary',
                },
              ].map(({ list, code }) => {
                const haveRole = list?.some((client) => client?.clientId === payee?.clientId);
                if (haveRole) {
                  return (
                    <div className={styles.payeeRole} key={code}>
                      {formatMessageApi({ Label_BIZ_Policy: code })}
                    </div>
                  );
                }
                return null;
              })}
              <div className={styles.companyTag}>
                {formatMessageApi({
                  Dropdown_CLM_CustomerType: formUtils.queryValue(payee?.organization) ? 'C' : 'P',
                })}
              </div>
            </div>
            <div className={styles.payeeRight}>
              <PaymentRow key={'title'}>
                <PayoutCurrency item={payee} />
                <div className={styles.totalPayoutAmount}>
                  {formatMessageApi({ Label_BIZ_Claim: 'TotalPayoutAmount' })}
                  <div className={styles.primaryColor}>{getTotalPayoutAmount(payee)}</div>
                </div>
              </PaymentRow>
              <div className={styles.PaymentDetails}>
                <SectionCard title={'Payment Details'}>
                  <PaymentRow key={'title'} className={styles.paymentDetailsTitle}>
                    {formatMessageApi({ Label_BIZ_Claim: 'Policy Number' })}
                    {formatMessageApi({ Label_BIZ_Claim: 'PayoutAmount' })}
                  </PaymentRow>
                  {getPaymentRow(payee)}
                </SectionCard>
              </div>
              <div className={styles.paymentMethod}>
                <SectionCard title={'payment method'}>
                  <PaymentMethod payee={payee} totalPayoutAmount={getTotalPayoutAmount(payee)} />
                </SectionCard>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
