import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { ModeIcon } from './Mode';
import styles from './ModeButtonList.less';

interface IComponentProps {
  enterActive: boolean;
  toggleMode: Function;
  openAdvancedQuery: Function;
}

export default ({ enterActive, toggleMode }: IComponentProps) => {
  const icon = [
    { class: styles.flowIcon, component: ModeIcon.flow, mode: 'flow' },
    { class: styles.tableIcon, component: ModeIcon.table, mode: 'table' },
    { class: styles.cardIcon, component: ModeIcon.card, mode: 'card' },
  ];
  const mode = [
    { class: styles.flow, mode: 'card' },
    { class: styles.table, mode: 'flow' },
    { class: styles.card, mode: 'table' },
  ];

  return (
    <div className={styles.content}>
      <div className={classnames({ [styles.show]: enterActive }, styles.box)}>
        <div className={styles.top} />
        <div className={styles.down}>
          {icon.map((item) => (
            <Icon className={item.class} component={item.component} key={item.mode} />
          ))}
        </div>
        {mode.map((item) => (
          <div
            className={item.class}
            onClick={() => {
              toggleMode(item.mode);
            }}
            key={item.mode}
          />
        ))}
      </div>
    </div>
  );
};
