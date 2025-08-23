import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from '../activity.config';
import styles from './PayeeInfo.less';
import PayeeBasicInfo from './PayeeBasicInfo';
import ChequeRemark from '../ChequeRemark';

const PayeeInfo = () => {
  const dispatch = useDispatch();

  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const Dropdown_COM_CountryCode = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_COM_CountryCode
  );
  const payeeListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.payeeListMap || {}
  );

  const payeeId = getDefaultPayeeId(payeeListMap);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removePayeeItem`,
      payload: {
        payeeId,
      },
    });
  };
  const countryCode =
    lodash
      .chain(Dropdown_COM_CountryCode)
      .find((el: any) => el.dictCode === tenant.region())
      .get('dictName')
      .value() || '';

  useEffect(() => {
    if (countryCode && !lodash.isEmpty(countryCode)) {
      dispatch({
        type: `${NAMESPACE}/initPayeeItem`,
        payload: {
          payeeId,
          countryCode,
        },
      });
    }
  }, [countryCode]);

  return (
    <div className={styles.payee}>
      <CardOfClaim
        cardStyle={{ backgroundColor: 'var(--card-1-bg-color)' }}
        className={'card1BgColor'}
        showButton={!taskNotEditable}
        handleClick={() => {
          handleDelete();
        }}
      >
        <PayeeBasicInfo countryCode={countryCode} />
        <ChequeRemark payeeId={payeeId} />
      </CardOfClaim>
    </div>
  );
};
export default PayeeInfo;
