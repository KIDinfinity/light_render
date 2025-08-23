import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { ReactComponent as eyeSvg } from 'configuration/assets/eye.svg';
import styles from './index.less';

interface ComponentProps {
  record: any;
}

class Duplicate extends Component<ComponentProps> {
  render() {
    const { children } = this.props;
    return (
      // @ts-ignore
      <Tooltip
        title={() => children
      }
        // visible={true}
        overlayClassName={styles.toolTip}
      >
        <Icon component={eyeSvg} />
      </Tooltip>
    );
  }
}

export default Duplicate;
