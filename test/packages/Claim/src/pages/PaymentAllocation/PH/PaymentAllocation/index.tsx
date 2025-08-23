import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Select } from 'antd';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Beneficiary from './Beneficiary';
import classnames from 'classnames';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const { Option } = Select;

const PayeeRow = ({ children, isHeader }) => {
  return (
    <div
      className={classnames(styles.payeeRow, {
        [styles.payeeDataRow]: !isHeader,
      })}
    >
      <div
        className={classnames(styles.payeeCell, {
          [styles.payeeRequiredHeader]: isHeader,
        })}
      >
        {children[0]}
      </div>
      <div
        className={classnames(styles.payeeCell, {
          [styles.payeeRequiredHeader]: isHeader,
        })}
      >
        {children[1]}
      </div>
      <div
        className={classnames(styles.payeeCell, {
          [styles.payeeRequiredHeader]: isHeader,
        })}
      >
        {children[2]}
      </div>
      <div className={styles.payeeCell}>{children[3]}</div>
    </div>
  );
};

const getClientName = (client) =>
  lodash.compact([client?.firstName, client?.middleName, client?.surname]).join(' ');

export default () => {
  const {
    policyOwnerList = [],
    policyInsuredList = [],
    policyBenefitList,
    policyCoverageList,
    clientInfoList,
    productNameMap,
    taskNotEditable,
  } = useSelector(
    ({ paymentAllocation, claimEditable }) => ({
      policyOwnerList: paymentAllocation.claimData?.c360PolicyInfo?.policyOwnerList,
      policyInsuredList: paymentAllocation.claimData?.c360PolicyInfo?.policyInsuredList,
      policyBenefitList: paymentAllocation.claimData?.policyBenefitList,
      policyCoverageList: paymentAllocation.claimData?.c360PolicyInfo?.policyCoverageList,
      clientInfoList: paymentAllocation.claimData?.c360PolicyInfo?.clientInfoList,
      productNameMap: paymentAllocation.claimData?.productNameMap,
      taskNotEditable: claimEditable.taskNotEditable,
    }),
    shallowEqual
  );
  //Dropdown_CFG_Currency
  const dicts = getDrowDownList('Dropdown_POL_RelationshipWithInsured');
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      {policyBenefitList?.map((benefitItem) => {
        const policyItem = policyCoverageList?.find(
          (policyCoverage) => policyCoverage.policyId === benefitItem.policyNo
        );
        const policyOwnerId = policyOwnerList?.find(
          (owner) => owner.policyId === benefitItem.policyNo
        )?.clientId;
        const insuredId = policyInsuredList?.find(
          (insured) => insured.policyId === benefitItem.policyNo
        )?.clientId;
        const policyOwner = clientInfoList?.find(
          (clientInfo) => clientInfo.clientId === policyOwnerId
        );
        const insured = clientInfoList?.find((clientInfo) => clientInfo.clientId === insuredId);

        const mainProductName =
          productNameMap?.[policyItem?.productCode] || policyItem?.productCode;


        return (
          <div className={styles.benefitCard} key={benefitItem.id}>
            <div className={styles.benefitLeft}>
              <div className={styles.benefitTitle}>
                {benefitItem.policyNo}
                {policyItem && (
                  <div className={styles.riskStatus}>
                    {formatMessageApi({ risk_status: policyItem.riskStatus })}
                  </div>
                )}
              </div>
              <div className={styles.benefitSubTitle}>{mainProductName}</div>
              <div className={styles.policyInfoRow}>
                {formatMessageApi({ Label_BIZ_Policy: 'PolicyOwner' })}
                <span className={styles.policyInfoRowValue}>{getClientName(policyOwner)}</span>
              </div>
              <div className={styles.policyInfoRow}>
                {formatMessageApi({ Label_BIZ_Policy: 'PolicyInsured' })}
                <span className={styles.policyInfoRowValue}>{getClientName(insured)}</span>
              </div>
              <div className={styles.policyInfoRow}>
                {formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.total-payment-amount',
                })}
                <span className={styles.policyInfoRowValue}>
                  {`${benefitItem.benefitAmount || 0} ${benefitItem.policyCurrency || ''}`}
                </span>
              </div>
            </div>
            <div className={styles.benefitRight}>
              <PayeeRow isHeader={true}>
                {formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.beneficiary.label.payTo',
                })}
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.payee',
                })}
                {formatMessageApi({ Label_BIZ_Claim: 'Shared Percentage(%)' })}
                {formatMessageApi({ Label_BIZ_Claim: 'PayoutAmount' })}
              </PayeeRow>
              {benefitItem.beneficiaryList?.map((beneficiary) => {
                return (
                  <Beneficiary
                    beneficiary={beneficiary}
                    key={beneficiary.id}
                    benefitItemId={benefitItem.id}
                  />
                );
              })}
              <PayeeRow isHeader={false}>
                <Select
                  disabled={taskNotEditable}
                  onChange={(payTo) => {
                    dispatch({
                      type: 'paymentAllocation/payeeAllocationAdd',
                      payload: {
                        payTo,
                        id: benefitItem?.id,
                      },
                    });
                  }}
                  style={{ minWidth: 100 }}
                  value={''}
                >
                  {dicts
                    .map(({ dictCode, dictName }) => (
                      <Option key={dictCode} value={dictCode}>
                        {dictName}
                      </Option>
                    ))}
                </Select>
                <div />
              </PayeeRow>
            </div>
          </div>
        );
      })}
    </div>
  );
};
