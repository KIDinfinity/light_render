import React from 'react';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { Icon, Tooltip } from 'antd';
import styles from './index.less';

interface IProps {
  errTip: string;
  children: any;
}

class ErrLabel extends React.PureComponent<IProps> {
  render() {
    const { errTip, children } = this.props;
    return (
      <div className={styles.errLabel}>
        <div className="label">
          {errTip ? (
            <Tooltip placement="topLeft" title={errTip}>
              <Icon className={styles.icon} component={ErrorSvg} />
            </Tooltip>
          ) : null}
        </div>
        <div className="ctn">{children}</div>
      </div>
    );
  }
}

export default ErrLabel;
