import React from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector, useDispatch } from 'dva';
import CardOfClaim from 'basic/components/Form/FormCard';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import Payee from 'process/Components/BussinessControls/Payee';
import styles from './PayeeInfo.less';

const PayeeInfo = () => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const payeeListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities.payeeListMap
  );
  const payeeId = getDefaultPayeeId(payeeListMap);

  return (
    <div className={styles.payee}>
      <CardOfClaim
        cardStyle={{ backgroundColor: 'var(--card-1-bg-color)' }}
        className={'card1BgColor'}
        showButton={editable}
        handleClick={() => {
          dispatch({
            type: `${NAMESPACE}/removePayeeItem`,
            payload: {
              payeeId,
            },
          });
        }}
      >
        <Payee.SectionBasic NAMESPACE={NAMESPACE} payeeId={payeeId} />
      </CardOfClaim>
    </div>
  );
};

export default PayeeInfo;
