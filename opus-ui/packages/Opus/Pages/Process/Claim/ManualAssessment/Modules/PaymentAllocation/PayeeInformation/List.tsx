import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ReactComponent as IconPlus } from 'opus/Assets/icon-plus.svg';

import Item from './Item';
import Card from '../Card';
import ContactInformationList from '../ContactInformation/List';
import BankAccountList from '../BankAccount/List';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const AddPayeeInformation = () => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: `${NAMESPACE}/addPayee`,
    });
  };

  return editable ? <Icon component={IconPlus} onClick={onAdd} className={styles.actions} /> : null;
};

const ActionComponent = ({ payeeId }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/deletePayee`,
      payload: {
        payeeId,
      },
    });
  };
  return (
    <div className={styles.btnWrapa}>
      <DeleteButton handleDelete={handleDelete} className={styles.icon} />
    </div>
  );
};

export default () => {
  const { payeeList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      payeeList: modelnamespace?.paymentModal?.datas?.payeeList,
    }),
    shallowEqual
  );
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return (
    <>
      {lodash.map(payeeList, (item: any) => (
        <div className={styles.contrainer}>
          <Card
            title={formatMessageApi({ Label_BIZ_Claim: 'PayeeInfo' })}
            actions={<AddPayeeInformation />}
            actionComponent={
              editable && lodash.size(payeeList) > 1 && <ActionComponent payeeId={item?.id} />
            }
          >
            <Item key={item?.id} item={item} />
            <ContactInformationList payeeId={item?.id} list={item?.payeeContactList} />
            <BankAccountList
              payeeId={item?.id}
              list={item?.payeeBankAccountList}
              paymentMethod={item.paymentMethod}
            />
          </Card>
        </div>
      ))}
    </>
  );
};
