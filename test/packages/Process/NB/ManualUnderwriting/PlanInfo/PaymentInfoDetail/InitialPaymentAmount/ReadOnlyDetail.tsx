import React, { useEffect, useMemo } from 'react';
import { Table, Icon } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { tenant, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import useGetPremiumDue from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumDue';
import Cheque from 'process/NB/Share/Components/Cheque';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import styles from './index.less';
import Refreshbutton from './Refreshbutton';
import useGetPayTypeCheuqeDisplay from 'process/NB/Share/hooks/useGetPayTypeCheuqeDisplay';
import useGetPaymentListDatta from 'process/NB/ManualUnderwriting/_hooks/useGetPaymentListDatta';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section';

const InitialPaymentAmount = ({ setExpendStatus, expendStatus }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'InitialPaymentInfo-Table',
    localConfig,
  });

  const payTypedictTypeCode = useMemo(() => {
    return lodash.get(
      lodash.find(config, (item: any) => item?.field === 'payType'),
      ['field-props', 'x-dict', 'dictTypeCode']
    );
  }, [config]);

  const regionCode = tenant.region();
  const payTypeCollection = useGetPayType();
  const paidAmount = useGetPremiumDue();
  const paymentList = useGetPaymentListDatta();
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const initialPaymentAmountColumns = useMemo(() => {
    const configForMW = config.map((item) => {
      const configItem = getApplicableByDisableCondidtions({
        fieldConfig: item,
        disableFieldsConditions,
        condition: 'mw',
      });
      return configItem;
    });
    return transTableRowsConfig({
      config: configForMW,
    });
  }, [config]);

  const isShow = useGetPayTypeCheuqeDisplay();
  useEffect(() => {
    return setExpendStatus(!expendStatus);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div
          className={classnames(styles.amount, {
            [styles.expandAmount]: expendStatus,
            [styles.packAmount]: !expendStatus,
          })}
        >
          <div
            className={classnames(styles.initial, {
              [styles.expandInitial]: expendStatus,
              [styles.packInitial]: !expendStatus,
            })}
          >
            <div className={styles.num}>
              {formatMessageApi({
                Label_BIZ_Policy: 'InitialPaymentMethod',
              })}
              :
            </div>
            <div className={styles.currency}>
              {tenant.region({
                [Region.ID]: <></>,
                notMatch: (
                  <>
                    {formatMessageApi({
                      [payTypedictTypeCode]: lodash.get(payTypeCollection, 'payType'),
                    }) || '-'}
                  </>
                ),
              })}
            </div>
            {regionCode !== Region.KH && regionCode !== Region.VN && <Refreshbutton />}
            <Icon
              type={!expendStatus ? 'down' : 'up'}
              onClick={() => setExpendStatus(!expendStatus)}
            />
          </div>
        </div>
        {expendStatus && (
          <>
            <Table
              columns={initialPaymentAmountColumns}
              dataSource={paymentList}
              pagination={false}
            />
            {regionCode === Region.PH &&
              lodash.some(
                initialPaymentAmountColumns,
                (item: any) => item?.key === 'policyInitialPremium'
              ) && (
                <div className={styles.totalWrap}>
                  <span className={styles.total}>Total</span>
                  <span className={styles.paidAmount}>
                    {getFieldDisplayAmount(paidAmount, 'nb.policyList.paidAmount')}
                  </span>
                </div>
              )}
          </>
        )}
      </div>

      {expendStatus && isShow ? (
        <div className={styles.chequeConainer}>
          <Cheque />
        </div>
      ) : null}
    </>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="planInfo">
      <InitialPaymentAmount />
    </ExpandableContainer>
  );
};
