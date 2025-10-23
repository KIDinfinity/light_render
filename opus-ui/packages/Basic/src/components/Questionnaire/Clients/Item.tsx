import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useIsSelectedClient from '../_hooks/useIsSelectedClient';
import useSelectClientCallback from 'basic/components/Questionnaire/_hooks/useSelectClientCallback';
import styles from './item.less';

const Item = ({ client }: any) => {
  const isSelected = useIsSelectedClient({
    clientId: client?.id,
  });
  const handleSelect = useSelectClientCallback({
    clientId: client?.id,
  });

  return (
    <div className={styles.clientItem} onClick={handleSelect}>
      <div
        className={classnames(styles.userName, {
          [styles.active]: isSelected,
        })}
      >
        {client.customerEnName}
      </div>
      <div className={styles.roles}>
        {lodash.map(client.roleList, (role: any, index) => {
          return (
            <div className={styles.role} key={index}>
              {formatMessageApi({ Dropdown_CLM_CustomerRole: role.customerRole })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Item;
