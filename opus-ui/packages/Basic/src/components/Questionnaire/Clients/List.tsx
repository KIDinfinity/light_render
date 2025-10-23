import React from 'react';
import lodash from 'lodash';
import useGetClients from 'basic/components/Questionnaire/_hooks/useGetClients';
import Item from './Item';
import styles from './list.less';

const List = () => {
  const clients = useGetClients();
  return (
    <div className={styles.list}>
      {lodash.map(clients, (client: any) => {
        return <Item key={client.id} client={client} />;
      })}
    </div>
  );
};

export default List;
