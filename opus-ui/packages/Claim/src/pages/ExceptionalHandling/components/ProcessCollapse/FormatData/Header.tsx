import React, { Component } from 'react';
import { Icon, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import styles from './index.less';

class Header extends Component<any> {
  copyData = () => {
    const { data } = this.props;
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', data);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    notification.success({ message: 'Copy Success' });
  };

  render() {
    const { type, time } = this.props;
    return (
      <div className={styles.header}>
        <div>
          <span>
            {formatMessageApi({
              Label_COM_Exception: type,
            })}
          </span>
          <span className={styles.time}>{time && moment(time).format('L LTS')}</span>
        </div>
        <div>
          <Icon type="copy" className={styles.copyIcon} onClick={this.copyData} />
        </div>
      </div>
    );
  }
}

export default Header;
