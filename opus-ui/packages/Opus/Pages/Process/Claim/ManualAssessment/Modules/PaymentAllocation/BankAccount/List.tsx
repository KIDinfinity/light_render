import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';

import Card from '../Card';
import Item from './Item';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as IconPlus } from 'opus/Assets/icon-plus.svg';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import styles from './index.less';

const AddBankAccount = ({ payeeId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: `${NAMESPACE}/addBankAccount`,
      payload: { payeeId },
    });
  };

  return editable ? <Icon component={IconPlus} onClick={onAdd} /> : null;
};

export default ({ payeeId, paymentMethod }: any) => {
  const { payeeList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      payeeList: modelnamespace?.paymentModal?.datas?.payeeList,
    }),
    shallowEqual
  );
  const payeeBankAccountList = lodash.find(payeeList, { id: payeeId })?.payeeBankAccountList || [];

  return (
    <div className={styles.list}>
      <Card title={formatMessageApi({ Label_BIZ_Claim: 'BankAccount' })}>
        {lodash.map(payeeBankAccountList, (item, index) => (
          <Item
            key={item?.id}
            item={item}
            payeeId={payeeId}
            paymentMethod={paymentMethod}
            actions={
              payeeBankAccountList.length - 1 === index ? (
                <AddBankAccount payeeId={payeeId} />
              ) : null
            }
          />
        ))}
      </Card>
    </div>
  );
};
