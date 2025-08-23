import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
import BreakDown from 'basic/enum/Breakdown';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './ButtonGroup.less';

const ButtonGroup = ({ incidentId, treatmentId, invoiceId, serviceItemId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap
  );

  const requireBreakdown = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]?.requireBreakdown
  );

  const claimServiceItemBreakDownList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]?.claimServiceItemBreakDownList
  );

  const showBreakdown = async (e: any) => {
    const { left, top } = e.target.getBoundingClientRect();
    await dispatch({
      type: `${NAMESPACE}/serviceItemBreakdownPoint`,
      payload: {
        top: Number(top),
        left: Number(left),
      }
    })

    await dispatch({
      type: `${NAMESPACE}/serviceItemBreakdownInit`,
      payload: {
        serviceItemId
      }
    })
  }

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
        serviceItemId,
        treatmentId,
        incidentId,
      },
    });
  };

  const handleDelete = async () => {
    await dispatch({
      type: `${NAMESPACE}/removeServiceItem`,
      payload: {
        invoiceId,
        serviceItemId,
      },
    });

    lodash.map(
      lodash.filter(serviceItemListMap, { serviceItemId }),
      ({ booster: boosterId, id }) => {
        dispatch({
          type: `${NAMESPACE}/removeServicePayableItem`,
          payload: {
            boosterId,
            id,
          },
        });
      }
    );
  };

  const icon = !useMemo(() => lodash.some(claimServiceItemBreakDownList, (item) => {
    return lodash.isNumber(formUtils.queryValue(item.expense)) || lodash.isNumber(formUtils.queryValue(item.unit))
  }), [claimServiceItemBreakDownList])

  return (
    <div className={styles.btnGroup}>
      {requireBreakdown === BreakDown.YES && (
        <Button
          className={styles.btn}
          onClick={showBreakdown}
        >
          {icon && <Icon type="exclamation-circle" className={styles.icon} theme="filled" />}
          {formatMessageApi({
            Label_BIZ_Claim: 'breakdown',
          })}
        </Button>
      )}
      <Button
        icon="plus"
        onClick={showAddPayable}
        className={styles.btn}
      >
        Payable
      </Button>
      {
        editable && (
          <Button
            className={classNames(styles.btn, styles.deleteBth)}
            onClick={handleDelete}
          >
            <Icon type="close" />
          </Button>
        )
      }
    </div >
  );
};

export default ButtonGroup;
