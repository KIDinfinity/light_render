import React, { useEffect } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon } from 'antd';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import classnames from 'classnames';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import useGetBankInfoFieldDataReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldDataReadOnly';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useGetBankInfo from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfo';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import styles from './index.less';
import useGetRenewalPaymentData from 'process/NB/ManualUnderwriting/_hooks/useGetRenewalPaymentData';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetBankInfoConfig from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoConfig';
import useGetBankCardInfoConfig from 'process/NB/ManualUnderwriting/_hooks/useGetBankCardInfoConfig';
import { localConfig } from './Section';

const RenewalPaymentAmount = ({ expendStatus, setExpendStatus }: any) => {
  const regionCode = tenant.region();
  const data = useGetRenewalPaymentData();
  const config = useGetSectionAtomConfig({
    section: 'RenewalPaymentInfo-Table',
    localConfig,
    extraConfig: {
      expiryDate: {
        format: 'MM/YYYY',
      },
    },
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'mw',
    });
    return configItem;
  });
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldDataReadOnly({ type: 'R' });
  const bankInfoConfig = useGetBankInfoConfig({
    config: configByDisableCondition,
  });
  const bankCardInfoConfig = useGetBankCardInfoConfig({
    config: configByDisableCondition,
  });
  const bankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeList,
    shallowEqual
  );
  const factoringHousesList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.factoringHousesList,
    shallowEqual
  );
  const payTypeCollection = useGetPayType();
  const bankInfo = useGetBankInfo({
    bankItem: data,
    bankCodeList,
    factoringHousesList,
  });
  useEffect(() => {
    return setExpendStatus(!expendStatus);
  }, []);
  return (
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
              Label_BIZ_Policy: 'RenewalPaymentMethod',
            })}
            :
          </div>
          <div className={styles.currency}>
            {formatMessageApi({
              Dropdown_POL_RenewalPaymentMethod: lodash.get(payTypeCollection, 'renewalPayType'),
            }) || '-'}
            <Icon
              type={!expendStatus ? 'down' : 'up'}
              style={{ marginLeft: '4px', display: regionCode == Region.TH ? 'none' : 'line' }}
              onClick={() => setExpendStatus(!expendStatus)}
            />
          </div>
        </div>
      </div>

      {expendStatus && regionCode !== Region.TH && (
        <div className={styles.Renewal}>
          <FormAntCard className={styles.wrap}>
            <div className={styles.title}>Bank Information</div>
            <ConfigurableReadOnlySection
              section="RenewalPaymentInfo-Table"
              config={bankInfoConfig}
              data={renewalPaymentBankInfoTableData} 
            />
          </FormAntCard>
          {regionCode !== Region.KH && (
            <FormAntCard className={styles.wrap}>
              <div className={styles.title}>Card Information</div>
              <ConfigurableReadOnlySection
                config={bankCardInfoConfig}
                data={bankInfo}
                section="RenewalPaymentInfo-Table"
              />
            </FormAntCard>
          )}
        </div>
      )}
    </div>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="planInfo">
      <RenewalPaymentAmount />
    </ExpandableContainer>
  );
};
