import React, { useState, useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { Row, Col, Radio } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import ShowHideButton from 'basic/components/Form/FormLayout/ShowHideButton';
import { SwitchEnum } from 'process/Utils/Payable';

import Item from './Item';
import ShortItem from './ShortItem';

import styles from './BankList.less';

const Bank = ({ list, NAMESPACE }: any) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const hasNewBank = lodash.find(list, (el: any) => el.manualAdd === SwitchEnum.YES);
  const newList = useMemo(() => {
    return !hasNewBank
      ? [
          ...(list || []),
          {
            manualAdd: SwitchEnum.YES,
            isNewBankAccount: SwitchEnum.YES,
            isDefault: SwitchEnum.NO,
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
              checked={!!bankItem.isSelect}
              onClick={() => {
                const id = bankItem.id;
                setExpand(bankItem.manualAdd === SwitchEnum.YES);
                dispatch({
                  type: `${NAMESPACE}/paymentPayeeItemBankAccountDefaultUpdate`,
                  payload: {
                    id,
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
                    {hasNewBank && <ShortItem item={bankItem} />}
                  </>
                ) : (
                  <ShortItem item={bankItem} NAMESPACE={NAMESPACE} />
                )
              ) : bankItem.manualAdd === SwitchEnum.YES ? (
                <>
                  {formatMessageApi({ Label_BIZ_Claim: 'isNewBankAct' })}
                  <Item
                    item={bankItem}
                    disabled={!(bankItem.isSelect && bankItem.manualAdd === SwitchEnum.YES)}
                    NAMESPACE={NAMESPACE}
                  />
                </>
              ) : (
                <Item
                  item={bankItem}
                  disabled={!(bankItem.isSelect && bankItem.manualAdd === SwitchEnum.YES)}
                  NAMESPACE={NAMESPACE}
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
