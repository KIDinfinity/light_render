import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Button } from 'antd';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ReactDOM from 'react-dom';
import styles from './ButtonGroup.less';

const ButtonGroup = ({ incidentId, switchOn, setSwitchOn }: any) => {
  const dispatch = useDispatch();

  const showSerialClaimSelection = () => {
    dispatch({
      type: 'claimCaseController/saveFurtherClaimVisable',
      payload: { furtherClaimVisable: true },
    });
  };

  const showAddPayable = async (e: any) => {
    const { top } = e.target.getBoundingClientRect();
    await dispatch({
      type: `${NAMESPACE}/popUpPablePoint`,
      payload: {
        top: Number(top),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/popUpPableInit`,
      payload: {
        incidentId,
      },
    });
  };

  return (
    <div className={styles.btnGroup}>
      <Button className={styles.btn} onClick={showSerialClaimSelection}>
        {formatMessageApi({ Label_BIZ_Claim: 'SerialClaimSelection' })}
      </Button>
      <Button className={styles.btn} onClick={() => setSwitchOn(!switchOn)}>
        {switchOn
          ? formatMessageApi({ Label_BIZ_Claim: 'Collapse' })
          : formatMessageApi({ Label_BIZ_Claim: 'Expand' })}
      </Button>
      <Button
        icon="plus"
        onClick={showAddPayable}
        className={styles.btn}
        ref={(div) => {
          if (div) {
            // eslint-disable-next-line react/no-find-dom-node
            const dom = ReactDOM.findDOMNode(div);
            const { width, left } = dom.getBoundingClientRect();
            dispatch({
              type: 'THCLMOfClaimAssessmentController/popUpPablePoint',
              payload: {
                left: Number(left) + Number(width),
              },
            });
          }
        }}
      >
        Payable
      </Button>
    </div>
  );
};

export default ButtonGroup;
