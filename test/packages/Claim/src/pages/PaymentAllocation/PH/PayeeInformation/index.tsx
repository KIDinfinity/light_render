import React, { useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { Row, Col, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import Basic from './_components/Basic';
import User from './_components/User';
import UsText from './_components/UsText';
import AddressList from './_components/AddressList';
import PaymentMethod from './_components/PaymentMethod';
import PayeeList from './_components/PayeeList';
import styles from './index.less';

// TODO:初始化不应该渲染
export default () => {
  const dispatch = useDispatch();

  const id = useSelector(({ paymentAllocation }: any) => paymentAllocation?.activePayeeId) || '';
  const payeeList =
    useSelector(({ paymentAllocation }: any) => paymentAllocation?.claimData?.payeeList) || [];

  const payeeItem = useMemo(() => {
    return lodash.find(payeeList, { id }) || {};
  }, [id, payeeList]);

  useEffect(() => {
    if (lodash.isEmpty(id) || lodash.isEmpty(payeeItem)) {
      if (!lodash.isEmpty(payeeList)) {
        dispatch({
          type: 'paymentAllocation/PayeeItemActiveIdUpdate',
          payload: {
            id: payeeList?.[0]?.id,
          },
        });
      }
    }
  }, [id, payeeList]);

  const handleDelete = () => {
    dispatch({
      type: 'paymentAllocation/PayeeItemDelete',
      payload: {
        id,
      },
    });
  };

  return (
    <Row gutter={16} className={styles.payeeWrap}>
      <Col span={20} className={styles.payeeCard}>
        <div className={styles.sider}>
          <Basic item={payeeItem} />
        </div>
        <div className={styles.content}>
          <div className={styles.iconWrap} onClick={handleDelete}>
            <Icon type="close-circle" />
          </div>
          {
            !!payeeList.length && (
              <>
                <User item={payeeItem} />
                <AddressList list={payeeItem?.payeeContactList || []} />
                <UsText item={payeeItem} />
                <PaymentMethod list={payeeItem?.payeeBankAccountList || []} item={payeeItem} />
              </>
            )
          }
        </div>
      </Col>
      <Col span={4} className={styles.basic}>
        <PayeeList id={id} />
      </Col>
    </Row>
  );
};
