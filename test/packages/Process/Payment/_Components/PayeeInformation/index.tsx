import React, { useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { Row, Col, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Basic from './_components/Basic';
import User from './_components/User';
import UsText from './_components/UsText';
import AddressList from './_components/AddressList';
import PaymentMethod from './_components/PaymentMethod';
import PayeeList from './_components/PayeeList';
import styles from './index.less';

// TODO:初始化不应该渲染
export default ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();

  const id =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.activePayeeId
    ) || '';
  const payeeList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.payeeList
    ) || [];

  const payeeItem = useMemo(() => {
    return lodash.find(payeeList, { id }) || {};
  }, [id, payeeList]);

  useEffect(() => {
    if (lodash.isEmpty(id) || lodash.isEmpty(payeeItem)) {
      if (!lodash.isEmpty(payeeList)) {
        dispatch({
          type: `${NAMESPACE}/paymentPayeeItemActiveIdUpdate`,
          payload: {
            id: payeeList?.[0]?.id,
          },
        });
      }
    }
  }, [id, payeeList]);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/paymentPayeeItemDelete`,
      payload: {
        id,
      },
    });
  };

  return (
    <Row gutter={16} className={styles.payeeWrap}>
      <Col span={20} className={styles.payeeCard}>
        {!!payeeList?.length && (
          <>
            <div className={styles.sider}>
              <Basic item={payeeItem} NAMESPACE={NAMESPACE} />
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrap} onClick={handleDelete}>
                <Icon type="close-circle" />
              </div>
              <User item={payeeItem} NAMESPACE={NAMESPACE} />
              <AddressList list={payeeItem?.payeeContactList || []} NAMESPACE={NAMESPACE} />
              {!formUtils.queryValue(payeeItem.organization) && (
                <UsText item={payeeItem} NAMESPACE={NAMESPACE} />
              )}
              <PaymentMethod
                list={payeeItem?.payeeBankAccountList || []}
                item={payeeItem}
                NAMESPACE={NAMESPACE}
              />
            </div>
          </>
        )}
      </Col>
      <Col span={4} className={styles.basic}>
        <PayeeList id={id} NAMESPACE={NAMESPACE} />
      </Col>
    </Row>
  );
};
