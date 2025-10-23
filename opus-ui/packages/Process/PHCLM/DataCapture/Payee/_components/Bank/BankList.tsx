import React, { useState, useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { Row, Col, Radio } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import ShowHideButton from 'basic/components/Form/FormLayout/ShowHideButton';
import { SwitchEnum } from 'process/Utils/Payable';

import { NAMESPACE } from '../../../activity.config';
import Item from './Item';
import ShortItem from './ShortItem';

import styles from './index.less';

const Bank = ({ id: payeeId, list }: any) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const hasNewBank = lodash.find(list, (el: any) => el.manualAdd === SwitchEnum.YES);
  const newList = useMemo(() => {
    return !hasNewBank
      ? [
          ...(list || []),
          {
            manualAdd: SwitchEnum.YES,
            isDefault: false,
            isSelect: false,
          },
        ]
      : list;
  }, [list, hasNewBank]);

  const IsSelectManual = lodash.find(
    list,
    (el: any) => el.manualAdd === SwitchEnum.YES && el.isSelect === 1
  );
  useEffect(() => {
    if (IsSelectManual) setExpand(true);
  }, []);

  const handleAdd = ({ id = '', isNew = false }: any) => {
    !!isNew &&
      dispatch({
        type: `${NAMESPACE}/addPayeeBankAccount`,
        payload: {
          payeeId,
          id,
        },
      });
    setExpand(true);
  };
  const handleDefault = () => {
    const addId =
      lodash
        .chain(list)
        .find((el: any) => el.manualAdd === SwitchEnum.YES)
        .get('id')
        .value() || '';
    dispatch({
      type: `${NAMESPACE}/removePayeeBankAccount`,
      payload: {
        payeeId,
        id: addId,
      },
    });
    setExpand(false);
  };
  return (
    <div className={styles.listWrap}>
      <Row>
        <Col span={1} />

        <Col span={23}>
          <Row className={styles.titleWrap}>
            {!expand && (
              <>
                <Col span={6}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.bank-code',
                  })}
                </Col>
                <Col span={6}>
                  {formatMessageApi({
                    Label_BIZ_Individual: 'BranchCode',
                  })}
                </Col>
                <Col span={6}>
                  {formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-data-capture.label.bank-account-no',
                  })}
                </Col>
                <Col span={6}>{formatMessageApi({ Label_BIZ_Individual: 'Accountholder' })}</Col>
              </>
            )}
          </Row>
        </Col>
      </Row>

      <ShowHideButton show={expand} onChange={setExpand} />
      {newList.map((bankItem: any) => (
        <Row key={bankItem?.id || 'newBankAccount'}>
          <Col span={1}>
            <Radio
              checked={!!bankItem.isDefault}
              onClick={async () => {
                const id = bankItem.id || uuidv4();
                bankItem.manualAdd === SwitchEnum.YES
                  ? await handleAdd({ id, isNew: !bankItem.id })
                  : await handleDefault();
                dispatch({
                  type: `${NAMESPACE}/choosePayment`,
                  payload: {
                    id,
                    payeeId,
                  },
                });
              }}
            />
          </Col>
          <Col span={23}>
            <div className={styles.item}>
              {!expand ? (
                bankItem.manualAdd === SwitchEnum.YES ? (
                  <>
                    {formatMessageApi({ Label_BIZ_Claim: 'isNewBankAct' })}
                    {hasNewBank && <ShortItem item={bankItem} payeeId={payeeId} />}
                  </>
                ) : (
                  <ShortItem item={bankItem} payeeId={payeeId} />
                )
              ) : bankItem.manualAdd === SwitchEnum.YES ? (
                <>
                  {formatMessageApi({ Label_BIZ_Claim: 'isNewBankAct' })}
                  <Item
                    item={bankItem}
                    payeeId={payeeId}
                    disabled={!(bankItem.isDefault && bankItem.manualAdd === SwitchEnum.YES)}
                  />
                </>
              ) : (
                <Item
                  item={bankItem}
                  payeeId={payeeId}
                  disabled={!(bankItem.isDefault && bankItem.manualAdd === SwitchEnum.YES)}
                />
              )}
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Bank;
