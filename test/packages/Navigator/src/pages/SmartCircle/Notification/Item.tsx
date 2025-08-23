import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import { connect } from 'dva';
import timeUtil from '@/utils/time';
import NotificationLink from 'navigator/components/NotificationLink';
import styles from './Item.less';

@connect(({ theme, smartCircleNotification }) => ({
  originActiveTheme: theme.originActiveTheme,
  scroll: smartCircleNotification.scroll,
}))
class Item extends Component {
  state = {
    more: false,
  };

  handleRead = async (item, idx) => {
    const { dispatch, scroll } = this.props;
    if (item.status === 1) {
      return;
    }

    await dispatch({
      type: 'smartCircleNotification/read',
      payload: {
        mid: item.mid,
        idx,
      },
    });

    scroll.scrollIntoView();
  };

  handleRemove = async (item, idx) => {
    const { dispatch, scroll } = this.props;

    await dispatch({
      type: 'smartCircleNotification/remove',
      payload: {
        mid: item.mid,
        status: item.status,
        idx,
      },
    });

    scroll.scrollIntoView();
  };

  handleMore = (event) => {
    event.stopPropagation();
    const { more } = this.state;
    this.setState({
      more: !more,
    });
  };

  render() {
    const { more } = this.state;
    const { item, idx, dispatch, originActiveTheme } = this.props;
    const len = item.content.length;
    return (
      <div className={styles.SmartCircleNotificationListItem}>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar style={{ backgroundColor: item.status ? '' : '#e87722' }} icon="bell" />
            }
            onClick={() => this.handleRead(item, idx)}
            description={
              <div>
                {len > 120 ? (
                  <div className={styles.content} style={{ height: more ? 'auto' : '65px' }}>
                    <NotificationLink content={item.content} dispatch={dispatch} />
                  </div>
                ) : (
                  <div className={styles.content}>
                    <NotificationLink content={item.content} dispatch={dispatch} />
                  </div>
                )}
                <div className={styles.show}>
                  <span className={styles.time}>{timeUtil.calendar(item.time, true)}</span>

                  {len > 120 && (
                    <span className={styles.down} onClick={(event) => this.handleMore(event)}>
                      <Icon type={more ? 'up' : 'down'} />
                    </span>
                  )}
                </div>
              </div>
            }
          />
          <span onClick={() => this.handleRemove(item, idx)} className={styles.delete}>
            <Icon
              className={styles.deleteIcon}
              type="delete"
              size="18"
              style={{ color: originActiveTheme === 'dark' ? '#ffffff' : '#000000' }}
            />
          </span>
        </List.Item>
      </div>
    );
  }
}

export default Item;
