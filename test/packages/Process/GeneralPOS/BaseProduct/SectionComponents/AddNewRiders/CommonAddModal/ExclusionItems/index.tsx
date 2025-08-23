import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import EditItem from './EditItem';
import styles from './index.less';

const ExclusionItems = ({ addData, setAddData }) => {
  const onDeleteExclusionItem = (id) => {
    setAddData((e) => ({
      ...e,
      list: lodash.filter(e.list, (item) => item.id !== id),
    }));
  };

  return (
    <div className={styles.container}>
      {lodash.map(addData?.list, (item: any, index: any) => {
        return (
          <div key={item?.id} className={styles.card}>
            {index > 0 ? (
              <Icon
                type="close"
                className={styles.close}
                onClick={() => onDeleteExclusionItem(item?.id)}
              />
            ) : null}
            <EditItem id={item.id} item={item} setAddData={setAddData} addData={addData} />
          </div>
        );
      })}
    </div>
  );
};

ExclusionItems.displayName = 'ExclusionItems';

export default ExclusionItems;
