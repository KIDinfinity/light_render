import React from 'react';
import { useSelector, useDispatch } from 'dva';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import styles from './Item.less';

const ItemExtra = ({ setCardStatus, incidentId, treatmentId }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/treatmentDelete',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  return (
    <div className={styles.cardExtra}>
      <ButtonOfSmall icon="minus" handleClick={() => setCardStatus(false)} />

      {editable && <ButtonOfSmall icon="close" handleClick={handleDelete} />}
    </div>
  );
};

export default ItemExtra;
