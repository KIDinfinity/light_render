import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card/Card';
import styles from './userCardList.less';

interface IProps {
  loadMore: Function;
  hasMore: boolean;
  scrollLoading: boolean;
  data: any;
  fnOnRowClick: Function;
}

const grid = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 8,
  xxl: 6,
};

class UserCardList extends Component<IProps> {
  render() {
    const { loadMore, hasMore, scrollLoading, data, fnOnRowClick } = this.props;
    return (
      <div className={styles.infiniteScrollWrapper}>
        {scrollLoading && (
          <div className="mask">
            {' '}
            <Spin />
          </div>
        )}

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMore}
          hasMore={!scrollLoading && hasMore}
          // loader={
          //   scrollLoading && hasMore ? (
          //     <div className="loadingWrapper" key={1}>
          //       <Spin />
          //     </div>
          //   ) : null
          // }
          useWindow={false}
        >
          <Row gutter={[16, 16]}>
            {map(data.list, (item: any, idx: number) => (
              <Col {...grid} key={idx}>
                <Card
                  userId={item.userId}
                  taskId={item.taskId}
                  userName={item.userName}
                  userGroup={item.userGroupName}
                  status={item.status}
                  todoCnt={item.todoCnt}
                  pendingCnt={item.pendingCnt}
                  record={item}
                  rowKey={idx}
                  fnOnRowClick={fnOnRowClick}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
    );
  }
}

export default UserCardList;
