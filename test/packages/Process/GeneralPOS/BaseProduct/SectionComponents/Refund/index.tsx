import React, { useEffect } from 'react';
import { Visible } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';

const Refund = ({ transactionId, config }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const refundAccountList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.refund?.refundAccountList
  );
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );
  const visibleConditions = true;

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/refundInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, servicingInit]);

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.refundInfo}>
          <SectionTable
            section="Refund"
            config={localConfig}
            dataSource={(refundAccountList || []).map((item, index) => index)}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
          >
            <Item transactionId={transactionId} />
          </SectionTable>
        </div>
      )}
    </>
  );
};

export default Refund;
