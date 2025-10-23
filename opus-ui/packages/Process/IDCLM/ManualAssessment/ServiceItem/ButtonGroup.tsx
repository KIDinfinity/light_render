import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import classNames from 'classnames';
import { NAMESPACE } from '../activity.config';
import styles from './ButtonGroup.less';

const ButtonGroup = ({ invoiceId, serviceItemId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.serviceItemListMap
  );

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

  return (
    <div className={styles.btnGroup}>
      {editable && (
        <Button className={classNames(styles.btn, styles.deleteBth)} onClick={handleDelete}>
          <Icon type="close" />
        </Button>
      )}
    </div>
  );
};

export default ButtonGroup;
