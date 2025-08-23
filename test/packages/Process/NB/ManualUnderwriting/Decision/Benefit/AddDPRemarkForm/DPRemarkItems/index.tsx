import React, { useEffect } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleDeleteaddDPRemarkItem from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteaddDPRemarkItem';
import EditItem from './EditItem';
import styles from './index.less';

const DPRemarkItems = () => {
  const dispatch = useDispatch();
  const addDPRemarkItems = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkItems,
    shallowEqual
  );
  useEffect(() => {
    if (lodash.isEmpty(addDPRemarkItems)) {
      dispatch({
        type: `${NAMESPACE}/addDPRemarkItems`,
      });
    }
  });
  const onDeleteDPRemarkItem = useHandleDeleteaddDPRemarkItem();

  return (
    <div className={styles.container}>
      {lodash.map(addDPRemarkItems, (item: any, index: any) => {
        return (
          <div key={item?.id} className={styles.card}>
            {index > 0 ? (
              <Icon
                type="close"
                className={styles.close}
                onClick={() =>
                  onDeleteDPRemarkItem({
                    DPRemarkItemId: item?.id,
                  })
                }
              />
            ) : null}
            <EditItem id={item.id} item={item} />
          </div>
        );
      })}
    </div>
  );
};

DPRemarkItems.displayName = 'DPRemarkItems';

export default DPRemarkItems;
