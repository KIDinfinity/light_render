import React from 'react';
import { Button, Icon } from 'antd';
import type { Mode} from './Mode';
import { ModeIcon } from './Mode';
import styles from './ModeEnterButton.less';

interface IComponentProps {
  mode: Mode;
  toggleEnter: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ mode, toggleEnter }: IComponentProps) => (
  <div className={styles.box}>
    <Button
      className={styles.button}
      type="primary"
      shape="circle"
      // onClick={toggleEnter}
    >
      {mode && (
        <div style={{ fontSize: 14, lineHeight: 1 }}>
          <Icon component={ModeIcon[mode]} className={styles[mode]} />
        </div>
      )}
    </Button>
  </div>
);
