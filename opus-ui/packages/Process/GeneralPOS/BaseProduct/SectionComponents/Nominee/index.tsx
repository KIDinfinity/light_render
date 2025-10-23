import React, { useEffect } from 'react';
import Item from './Item';
import styles from './index.less';
import { FormAntCard } from 'basic/components/Form';
import classNames from 'classnames';
import { localConfig, SectionTable } from './Section';
import TotalSection from './TotalSection';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useDispatch } from 'dva';

const Nominee = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const beneficiaryList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.beneficiaryList
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getDedupCheckKey`,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/nomineeInit`,
      payload: {
        transactionId,
      },
    });
  }, [transactionId]);
  return (
    <div className={styles.nominee}>
      <FormAntCard>
        <SectionTable
          config={localConfig}
          section="Nominee"
          tableCollect={() => {}}
          dataSource={beneficiaryList?.map((item, index) => index)}
          className={styles.hiddencolor}
          classNameHeader={classNames({
            [styles.selfTableHeader]: true,
          })}
        >
          <Item transactionId={transactionId} />
        </SectionTable>
        <TotalSection />
      </FormAntCard>
    </div>
  );
};

export default Nominee;
