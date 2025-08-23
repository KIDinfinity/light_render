import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import EditItem from './EditItem';
import useGetAddingLoadingItems from 'process/NB/ManualUnderwriting/_hooks/useGetAddingLoadingItems';
import useHandleDeleteAddingLoadingItem from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteAddingLoadingItem';
import styles from './index.less';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useHandleChangeLoadingCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeLoadingCallback';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const LoadingItems = () => {
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const addingLoadingItems = useGetAddingLoadingItems();
  const onDeleteLoadingItem = useHandleDeleteAddingLoadingItem();
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
