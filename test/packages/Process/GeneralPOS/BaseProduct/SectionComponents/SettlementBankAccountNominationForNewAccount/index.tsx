import React, { useRef, useEffect } from 'react';
import Item from './Item';
import styles from './index.less';
import { Radio, Icon } from 'antd';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const PaymentMethodForNewAccount = ({ transactionId, hasTxPmBank }: any) => {
  const dispatch = useDispatch();
  const handleAsync = useRef(false);
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethodForNewAccount);
  const paymentMethodList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList
  );
  const allBank =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allBank) || [];
  const txPmBankList = paymentMethodList?.[0]?.txPmBankList || [];
  const newItem = txPmBankList?.find((item) => item?.bankNewAdd === 'Y') || {};
  const index = txPmBankList?.findIndex((item) => item?.bankNewAdd === 'Y');
  const addAccountHandle = async () => {
    if (!editable) {
      return;
    }
    if (lodash.isEmpty(newItem) && !handleAsync.current) {
      handleAsync.current = true;
      await dispatch({
        type: `${NAMESPACE}/settlementBankAccountNominationUpdate`,
        payload: {
          changedFields: {},
          transactionId,
          validating: false,
          type: OperationTypeEnum.ADD,
        },
      });
      handleAsync.current = false;
    }
    if (!lodash.isEmpty(newItem)) {
      dispatch({
        type: `${NAMESPACE}/settlementBankAccountNominationUpdate`,
        payload: {
          transactionId,
          index,
          type: OperationTypeEnum.COVER,
          changedFields: {
            selected: true,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!!editable && lodash.isEmpty(newItem) && !lodash.isEmpty(allBank) && !hasTxPmBank) {
      addAccountHandle();
    }
  }, [editable, newItem, allBank, hasTxPmBank]);

  const removeHandle = () => {
    dispatch({
      type: `${NAMESPACE}/settlementBankAccountNominationUpdate`,
      payload: {
        transactionId,
        index,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Radio className={styles.addRadio} onClick={addAccountHandle} checked={newItem?.selected} />
      <div>
        <div className={styles.addSectionLabel}>New Account</div>
        {!lodash.isEmpty(newItem) && (
          <Item
            editable={editable}
            transactionId={transactionId}
            id={index}
            txPmBankList={txPmBankList}
          />
        )}
        {editable && newItem?.bankNewAdd === 'Y' && !!hasTxPmBank && (
          <div className={styles.btn}>
            <div className={styles.icon} onClick={removeHandle}>
              <Icon type="close" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodForNewAccount;
