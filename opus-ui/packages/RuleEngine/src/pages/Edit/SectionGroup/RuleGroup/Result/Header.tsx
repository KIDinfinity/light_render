import React from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ButtonType } from '../../../Enum';
import styles from './index.less';

function Header({ taskNotEditable, onAdd }: any) {
  const list = [
    { key: ButtonType.ADD, labelId: 'venus_claim.ruleEngine.label.button.addToLibrary' },
    {
      key: ButtonType.SEARCH,
      disabled: true,
      labelId: 'venus_claim.ruleEngine.label.button.existingResult',
    },
    { key: ButtonType.NEW, labelId: 'venus_claim.ruleEngine.label.button.newResult' },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.headerRight}>
        {lodash.map(list, (item: any) => {
          return (
            <Button
              key={item.key}
              shape="round"
              icon="plus"
              disabled={taskNotEditable}
              onClick={() => {
                onAdd(item.key);
              }}
            >
              {formatMessageApi({
                Label_BIZ_Claim: item.labelId,
              })}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
