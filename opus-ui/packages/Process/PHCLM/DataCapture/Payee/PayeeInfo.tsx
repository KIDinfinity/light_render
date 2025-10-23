import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';
import { NAMESPACE } from '../activity.config';
import styles from './PayeeInfo.less';

import { useGetCountryCode } from './_hooks';

import Basic from './_components/Basic';
import Bank from './_components/Bank';
import PayeeList from './_components/PayeeList';

const PayeeInfo = () => {
  const dispatch = useDispatch();

  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const selectedPayeeId =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.selectedPayeeId) || '';

  // 默认选中第0个
  const defaultId = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.claimProcessData?.payeeList?.[0]
  );

  const item =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace?.claimEntities?.payeeListMap?.[selectedPayeeId]
    ) || {};

  const countryCode = useGetCountryCode({ payeeId: item.id });

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removePayeeItem`,
      payload: {
        payeeId: item.id,
      },
    });
  };

  useEffect(() => {
    if (lodash.isEmpty(selectedPayeeId)) {
      dispatch({
        type: `${NAMESPACE}/selectPayeeId`,
        payload: { id: defaultId },
      });
    }
  }, []);

  return (
    <div className={styles.payeeWrap}>
      <div style={{ flex: 5 }}>
        <CardOfClaim
          cardStyle={{ backgroundColor: 'var(--claim-card-1-bg-color)' }}
          className={styles.claimCard2}
          showButton={!taskNotEditable}
          handleClick={() => {
            handleDelete();
          }}
        >
          <div className={styles.leftWrap}>
            <Basic item={item} countryCode={countryCode} />
            <Bank item={item} countryCode={countryCode} />
          </div>
        </CardOfClaim>
      </div>
      <PayeeList payeeId={item.id} />
    </div>
  );
};
export default PayeeInfo;
