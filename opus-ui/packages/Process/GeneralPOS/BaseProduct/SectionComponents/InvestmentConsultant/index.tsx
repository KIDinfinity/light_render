import React, { useEffect } from 'react';
import styles from './index.less';
import Item from './Item';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { SectionTitle } from './Section';
import { NAMESPACE } from '../../activity.config';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';

const InvestmentConsultant = ({ transactionId, remark }: any) => {
  const dispatch = useDispatch();

  const transactionTypes = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );

  const currentTransactionTypeCode = lodash
    .values(transactionTypes)
    .map((item) => formUtils.queryValue(item.transactionTypeCode))?.[0];

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/investmentConsultantInit`,
      payload: {
        transactionId,
      },
    });
  }, [currentTransactionTypeCode]);

  return (
    <div className={styles.investmentConsultant}>
      <FormAntCard title={<SectionTitle />}>
        <Item transactionId={transactionId} remark={remark} />
      </FormAntCard>
    </div>
  );
};

export default InvestmentConsultant;
