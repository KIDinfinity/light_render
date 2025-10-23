import React, { useEffect } from 'react';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import AddSection from './AddSection';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

const RequestForMaturityBooster = ({
  transactionId,
  config,
  transactionTypeCode,
  section,
}: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

  const eventList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster?.eventList
  );

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/requestForMaturityBoosterUpdateInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, isNotDataCapture]);

  return (
    <>
      <div className={styles.singleTopup}>
        <SectionTable
          section="RequestForMaturityBooster-field"
          config={localConfig}
          dataSource={(eventList || []).map((item, index) => index)}
          className={styles.hiddencolor}
          classNameHeader={styles.selfTableHeader}
          numberShowRight
        >
          <Item
            section="RequestForMaturityBooster-field"
            transactionId={transactionId}
            transactionTypeCode={transactionTypeCode}
          />
        </SectionTable>
        {
          <div className={styles.addFund}>
            <AddSection transactionId={transactionId} />
          </div>
        }
      </div>
    </>
  );
};

export default RequestForMaturityBooster;
