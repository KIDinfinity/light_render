import React from 'react';
import { Row, Col, Avatar } from 'antd';
import fileIcon from 'navigator/assets/file.svg';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import styles from './ChatWindowOfContentListItemSelf.less';

export default ({ item, img }) => (
  <div>
    {item.showTime && <p style={{ textAlign: 'center' }}>{item.calendarTime}</p>}
    <div className={styles.item}>
      <Row gutter={12} type="flex" justify="end" align="middle">
        <Col>
          <div className={styles.content}>
            <span>{item?.content}</span>

            {item?.status === 1 && (
              <span className={styles.status}>
                <img src={fileIcon} alt="" />
              </span>
            )}
          </div>
        </Col>
        <Col className={styles.avatar}>
          <Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />
        </Col>
      </Row>
    </div>
  </div>
);
