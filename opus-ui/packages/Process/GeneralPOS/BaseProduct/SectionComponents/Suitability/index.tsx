import React, { useEffect } from 'react';
import styles from './index.less';
import Item from './Item';
import { SectionTitle } from './Section';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';

const Suitability = ({ transactionId }) => {
  const dispatch = useDispatch();

  const clientSuitabilityProfileList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.clientSuitabilityProfileList
  );
  const transactionTypes = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );

  const currentTransactionTypeCode = lodash
    .values(transactionTypes)
    .map((item) => formUtils.queryValue(item.transactionTypeCode))?.[0];

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/suitabilityInit`,
      payload: { transactionId, clientSuitabilityProfileList },
    });
  }, [clientSuitabilityProfileList, transactionId, currentTransactionTypeCode]);

  return (
    <div className={styles.wrapper}>
      <FormAntCard title={<SectionTitle />}>
        <Item transactionId={transactionId} />
      </FormAntCard>
    </div>
  );
};

export default Suitability;
