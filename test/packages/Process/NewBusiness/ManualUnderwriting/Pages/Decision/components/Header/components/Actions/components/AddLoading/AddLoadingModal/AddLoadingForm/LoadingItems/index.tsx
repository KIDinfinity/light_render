import React, { useCallback } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import EditItem from './EditItem';
import styles from './index.less';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import useHandleChangeLoadingCallback from 'decision/components/Header/components/Actions/_hooks/useHandleChangeLoadingCallback';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const LoadingItems = () => {
  const dispatch = useDispatch();
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const addingLoadingItems = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addingLoadingItems,
    shallowEqual
  );
  const onDeleteLoadingItem = useCallback(
    ({ loadingItemId }) =>
      dispatch({
        type: `${NAMESPACE}/deleteLoadingItem`,
        payload: { loadingItemId },
      }),
    [dispatch]
  );
  const addLoadingModalDependencies = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addLoadingModalDependencies,
    shallowEqual
  );

  return (
    <div className={styles.container}>
      {lodash.map(addingLoadingItems, (item: any, index: any) => {
        return (
          <div key={item?.id} className={styles.card}>
            {index > 0 ? (
              <Icon
                type="close"
                className={styles.close}
                onClick={() =>
                  onDeleteLoadingItem({
                    loadingItemId: item?.id,
                  })
                }
              />
            ) : null}
            <EditItem
              loadingId={item.id}
              item={item}
              dependency={addLoadingModalDependencies}
              handleChangeLoading={handleChangeLoading}
            />
          </div>
        );
      })}
    </div>
  );
};

LoadingItems.displayName = 'loadingItems';

export default LoadingItems;
