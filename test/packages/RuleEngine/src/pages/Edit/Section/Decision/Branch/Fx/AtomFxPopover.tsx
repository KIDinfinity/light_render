import React, { useState } from 'react';
import {useDispatch} from 'dva';
import { Popover } from 'antd';
import AtomFxPopoverForm from './AtomFxPopoverForm';
import styles from './AtomFxPopover.less';

export default ((props: any) => {
  const { conditionId, children } = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const onVisibleChange = (value) => {
    setVisible(value);
    if (value) {
      dispatch({
        type: 'ruleEngineController/addOriginAtomFx',
        payload: {
          conditionId,
        },
      });
    } else {
      dispatch({
        type: 'ruleEngineController/resetAtomFx',
        payload: {
          conditionId,
        },
      });
    }
  };

  return (
    <Popover
      overlayClassName="fxpopover"
      content={
        <div className={styles.fxpopover}>
          <AtomFxPopoverForm {...props} setVisible={setVisible} />
        </div>
      }
      placement="bottom"
      trigger="click"
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Popover>
  );
});
