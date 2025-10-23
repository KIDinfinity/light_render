import React, { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

import { Button, Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ReactDOM from 'react-dom';
import styles from './ButtonGroup.less';

const ButtonGroup = ({ incidentId, setSwitchOn, switchOn }: any) => {
  const dispatch = useDispatch();

  const adjustmentFactorListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.adjustmentFactorListMap
  );
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );

  const showSerialClaimSelection = () => {
    dispatch({
      type: 'claimCaseController/saveFurtherClaimVisable',
      payload: { furtherClaimVisable: true },
    });
  };

  const icon = useMemo(
    () =>
      lodash.some(
        adjustmentFactorListMap,
        (item) =>
          lodash.size(item?.factorList) > 0 &&
          lodash.find(claimPayableListMap, { incidentId, productCode: item?.productCode })
      ),
    [adjustmentFactorListMap, claimPayableListMap]
  );

  const showAddPayable = async (e: any) => {
    const { top, left, width } = e.target.getBoundingClientRect();
    await dispatch({
      type: `${NAMESPACE}/popUpPablePoint`,
      payload: {
        top: Number(top),
        left: Number(left) + Number(width),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/popUpPableInit`,
      payload: {
        incidentId,
      },
    });
  };

  const showFactor = (e: any) => {
    const { top, left, width } = e.target?.parentNode?.parentNode.getBoundingClientRect();
    dispatch({
      type: `${NAMESPACE}/setAdjustmentFactorState`,
      payload: {
        visible: true,
        top: Number(top),
        left: Number(left) + Number(width),
        incidentId,
      },
    });
  };

  return (
    <div className={styles.btnGroup}>
      <div className={styles.buttonIcon}>
        {icon && <Icon type="exclamation-circle" className={styles.icon} theme="filled" />}
        <Button className={styles.btn} onClick={showFactor}>
          {formatMessageApi({
            Label_BIZ_Claim: 'AdjustmentFactor',
          })}
        </Button>
      </div>
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

            // dispatch({
            //   type: 'HKCLMOfClaimAssessmentController/popUpPablePoint',
            //   payload: {
            //     left: Number(left) + Number(width),
            //   },
            // });
          }
        }}
      >
        Payable
      </Button>
    </div>
  );
};

export default ButtonGroup;
