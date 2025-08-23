import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Visible } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import SwitchingOutOptionSection from './SwitchingOutOptionSection';
import AddSection from './AddSection';
import TotalSection from './TotalSection';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { tenant, Region } from '@/components/Tenant';
import { LimitTypeEnum } from 'process/GeneralPOS/common/Enum';

const FundSwitch = ({ transactionId, config, transactionTypeCode }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

  const fundSwitchingFundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
        ?.fundSwitchingFundList
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const policyFundDOList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyFundDOList
  );
  const policyInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo?.policyInfoList
  );
  const companyCode = lodash
    .chain(policyInfoList)
    .find((item) => item.policyId === mainPolicyId)
    .get('companyCode')
    .value();

  const visibleConditions = true;

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllFundConfigList`,
      payload: { mainPolicyId, transactionTypeCode },
    });
  }, [mainPolicyId, policyInfo]);

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/fundSwitchInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, isNotDataCapture, policyFundDOList]);

  useEffect(() => {
    if ([Region.MY, Region.PH].includes(tenant.region())) {
      dispatch({
        type: `${NAMESPACE}/getLimitDataByType`,
        payload: { companyCode, limitType: LimitTypeEnum.InputFundSwitchSwitchOutAmount },
      });
    }
  }, [companyCode]);

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.fundSwitchInfo}>
          <SwitchingOutOptionSection transactionId={transactionId} />
          <SectionTable
            section="FundSwitching"
            config={localConfig}
            dataSource={(fundSwitchingFundList || []).map((item, index) => index)}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
            numberShowRight
          >
            <Item transactionId={transactionId} />
          </SectionTable>
          <div className={styles.addFund}>
            <AddSection transactionId={transactionId} />
            <TotalSection transactionId={transactionId} />
          </div>
        </div>
      )}
    </>
  );
};

export default FundSwitch;
