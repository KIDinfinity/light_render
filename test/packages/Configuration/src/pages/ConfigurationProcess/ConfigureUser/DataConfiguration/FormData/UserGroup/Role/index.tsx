import React, { useState,useEffect } from 'react';
import Empty from '@/components/Empty';
import lodash, { isEmpty } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';
import RoleItem from './RoleItem';
import styles from './index.less';

const defaultPageSize=10;

export default ({ roleData:totalroleData }: any) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [curRoleData, setCurRoleData] = useState([]);
  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    if (curRoleData.length > totalroleData.length) {
      setLoading(false);
      setHasMore(false)
      return;
    }
    const data=lodash.slice(totalroleData,0,curRoleData?.length+defaultPageSize);
    setCurRoleData(data);
    setLoading(false);
  };

  useEffect(()=>{
    setCurRoleData(lodash.slice(totalroleData,0,defaultPageSize))
  },[])
  return (
    <div className={styles.role}>
      <div className={styles.content}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={hasMore}
          useWindow={false}
          key="init"
        >
          {lodash.map(curRoleData, (item: any, index: any) =>
            !isEmpty(item?.data) ? (
              <div className={styles.roleItem} key={`${item?.data?.role_code}${index}`}>
                <RoleItem item={item?.data} />
              </div>
            ) : (
              <Empty className={styles.empty} />
            )
          )}
          {loading && hasMore && (
            <div className={styles.loadingWrap}>
              <Spin />
            </div>
          )}
          {isEmpty(curRoleData) && <Empty />}
        </InfiniteScroll>
      </div>
    </div>
  );
};
