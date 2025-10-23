import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import lodash from 'lodash';
import IconWithLine from 'opus/NewBusiness/ManualUnderwriting/_components/IconWithLine';
import classNames from 'classnames';

interface AddItem {
  title: string;
  buttonCode: string;
  disabled?: boolean;
  action: () => void;
}

interface IProps {
  addActions: [AddItem] | [];
  icon: React.ReactElement | string;
}

export default ({ addActions, icon }: IProps) => {
  return (
    <div className={styles.container}>
      <IconWithLine icon={icon} />
      <div className={styles.actions}>
        {lodash.map(addActions, (actionItem: any) => {
          return (
            <div
              className={classNames(styles.action, {
                [styles.disabled]: actionItem.disabled,
              })}
              key={actionItem.buttonCode}
              onClick={actionItem?.action}
            >
              <Icon type="plus" /> {actionItem.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
