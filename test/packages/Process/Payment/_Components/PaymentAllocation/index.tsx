import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Select } from 'antd';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Beneficiary from './Beneficiary';
import classnames from 'classnames';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section/index';

const { Option } = Select;

const PayeeRow = ({ children, isHeader }: { children: any; isHeader?: boolean }) => {
  return (
    <div
      className={classnames(styles.payeeRow, {
        [styles.payeeDataRow]: !isHeader,
      })}
    >
      {children.map((child: string, index: number) => {
        let flex = children.length > 4 ? '1 1 12.5%' : '1 1 10%';

        if (index === 0 && children.length <= 4) {
          flex = '1 1 12%';
        } else if (index === 1) {
          flex = '1 1 25%';
        } else if (index === 2 && children.length <= 4) {
          flex = '1 1 16%';
        }
        return (
          <div
            key={index}
            className={classnames(styles.payeeCell, {
              [styles.firstPayeeCell]: index === 0,
              [styles.payeeRequiredHeader]: isHeader && index < 3,
            })}
            style={{ flex }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

const getClientName = (client) =>
  lodash.compact([client?.firstName, client?.middleName, client?.surname]).join(' ');

export default ({ NAMESPACE }: any) => {
  const {
    policyOwnerList = [],
    policyInsuredList = [],
    policyBenefitList,
    policyCoverageList,
    clientInfoList,
    productNameMap,
  } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      policyOwnerList: modelnamespace?.paymentModal?.datas?.c360PolicyInfo?.policyOwnerList,
      policyInsuredList: modelnamespace?.paymentModal?.datas?.c360PolicyInfo?.policyInsuredList,
      policyBenefitList: modelnamespace?.paymentModal?.datas?.policyBenefitList,
      policyCoverageList: modelnamespace?.paymentModal?.datas?.c360PolicyInfo?.policyCoverageList,
      clientInfoList: modelnamespace?.paymentModal?.datas?.c360PolicyInfo?.clientInfoList,
      productNameMap: modelnamespace?.paymentModal?.datas?.productNameMap,
    }),
    shallowEqual
  );

  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  //Dropdown_CFG_Currency
  const dicts = getDrowDownList('Dropdown_POL_RelationshipWithInsured');
  const dispatch = useDispatch();

  const config =
    useGetSectionAtomConfig({
      section: 'payeePayment',
      localConfig,
    }) || [];

  const visiblePayeeFields = useMemo(() => {
    const filtered = lodash.filter(config, (item) => item?.['field-props']?.visible === 'Y');
    return lodash.orderBy(filtered, (item) => item?.['field-props']?.['x-layout']?.lg?.order || 0);
  }, [config?.length]);

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
              <div
                className={styles.innerRight}
                style={{
                  minWidth:
                    visiblePayeeFields?.length > 4 ? 1300 : visiblePayeeFields?.length * 185,
                }}
              >
                <PayeeRow isHeader={true}>
                  {visiblePayeeFields?.map((item) => {
                    const fieldProps = item?.['field-props'];
                    if (item?.field === 'beneficiaryPercentage') {
                      return formatMessageApi({ Label_BIZ_Claim: 'Shared Percentage(%)' });
                    }
                    return formatMessageApi({
                      [fieldProps?.label?.dictTypeCode]: fieldProps?.label?.dictCode,
                    });
                  })}
                </PayeeRow>
                {benefitItem.beneficiaryList?.map((beneficiary) => {
                  return (
                    <Beneficiary
                      beneficiary={beneficiary}
                      key={beneficiary.id}
                      benefitItemId={benefitItem.id}
                      NAMESPACE={NAMESPACE}
                    />
                  );
                })}
                <PayeeRow isHeader={false}>
                  <Select
                    disabled={taskNotEditable}
                    onChange={(payTo) => {
                      dispatch({
                        type: `${NAMESPACE}/paymentPayeeAllocationAdd`,
                        payload: {
                          payTo,
                          id: benefitItem?.id,
                        },
                      });
                    }}
                    style={{ minWidth: 100 }}
                    value={''}
                  >
                    {dicts.map(({ dictCode, dictName }) => (
                      <Option key={dictCode} value={dictCode}>
                        {dictName}
                      </Option>
                    ))}
                  </Select>
                  <div />
                </PayeeRow>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
