import React, { useEffect } from 'react';
import { Visible } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import AddSection from './AddSection';
import TotalSection from './TotalSection';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

const FundAllocation = ({ transactionId, config, form, transactionTypeCode }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

  const fundAllocationFundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundAllocation
        ?.fundAllocationFundList
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
        type: `${NAMESPACE}/fundAllocationInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, isNotDataCapture, policyFundDOList]);

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.fundAllocation}>
          <SectionTable
            section="FundAllocation"
            config={localConfig}
            dataSource={(fundAllocationFundList || []).map((item, index) => index)}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
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

export default FundAllocation;
