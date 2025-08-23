import React, { useEffect } from 'react';
import { FormAntCard } from 'basic/components/Form';
import Item from './Item';
import { SectionTitle } from './Section';
import styles from './index.less';
import { NAMESPACE } from '../../activity.config';
import { useDispatch, useSelector } from 'dva';
import filterCheckList from 'process/GeneralPOS/BaseProduct/utils/filterCheckList';

const Checklist = ({ doubleTransaction, transactionId, remark }) => {
  const dispatch = useDispatch();
  const processData = useSelector((state) => state.GeneralPOSController?.processData);

  const newRemark = filterCheckList({
    checkList: remark,
    processData,
  });
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/checklistInit`,
      payload: {
        doubleTransaction,
        transactionId,
        remark: newRemark,
      },
    });
  }, [newRemark]);
  return (
    <FormAntCard title={<SectionTitle />} className={styles.checklistBox}>
      <Item
        transactionId={transactionId}
        doubleTransaction={doubleTransaction}
        remark={newRemark}
      />
    </FormAntCard>
  );
};

export default Checklist;
