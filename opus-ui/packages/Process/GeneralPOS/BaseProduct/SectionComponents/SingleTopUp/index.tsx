import React, { useEffect } from 'react';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import AddSection from './AddSection';
import TotalSection from './TotalSection';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const SingleTopUp = ({ transactionId, config, transactionTypeCode }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

  const fundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.singleTopup?.fundList
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
        type: `${NAMESPACE}/singleTopUpInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, isNotDataCapture, policyFundDOList]);
  return (
    <>
      <div className={styles.singleTopup}>
        <SectionTable
          section="SingleTopUp"
          config={localConfig}
          dataSource={(fundList || []).map((item, index) => index)}
          className={styles.hiddencolor}
          classNameHeader={styles.selfTableHeader}
          numberShowRight
        >
          <Item transactionId={transactionId} transactionTypeCode={transactionTypeCode} />
        </SectionTable>
        <div className={styles.addFund}>
          <AddSection transactionId={transactionId} />
          <TotalSection transactionId={transactionId} />
        </div>
      </div>
    </>
  );
};

export default SingleTopUp;
