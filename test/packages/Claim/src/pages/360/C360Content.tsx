import React, { useEffect } from 'react';
import { Tabs, Spin } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import navigator from 'navigator/api';
import Client from './pages/Client';
import type { TabsKey } from './enum';
import { Menus } from './c360.config';
import styles from './index.less';

const { TabPane } = Tabs;

const Custom = () => {
  const dispatch = useDispatch();
  const changeId = useSelector(({ insured360 }: any) => insured360?.taskInfo?.changeId) || '';
  const coverageList = useSelector(({ insured360 }: any) => insured360?.coverageList) || [];
  const activeKey = useSelector((state: any) => state.workspaceSwitchOn?.c360Tab);
  const sideBarOverallList =
    useSelector(({ insured360 }: any) => insured360?.sideBarOverallList) || [];
  const hasComment = sideBarOverallList.some((item: any) => item.userCommentList?.length);
  const loading = useSelector(
    (state: any) => state.loading.effects['insured360/getMultipleOverallSideBar']
  );

  const changeTab = (key: TabsKey) => {
    dispatch({
      type: 'workspaceSwitchOn/changeC360Tab',
      payload: {
        key,
      },
    });
  };
  useEffect(() => {
    if (changeId) {
      dispatch({ type: 'insured360/getCustomerTypeConfig' });
    } else {
      dispatch({ type: 'insured360/clearInsured' });
    }
  }, [changeId]);

  useEffect(() => {
    navigator.SiderWorkSpaceController.send(activeKey);
  }, [activeKey]);

  return (
    <>
      <Client />
      <Tabs
        activeKey={activeKey}
        onChange={(key: any) => {
          changeTab(key);
        }}
      >
        {Menus({ coverageList, hasComment }).map(
          ({ key, format, component: Component, show }: any) => {
            return show ? (
              <TabPane
                tab={formatMessageApi({ [`${format.typeCode}`]: format.dictCode })}
                key={key}
              >
                {loading ? (
                  <div className={styles.spin}>
                    <Spin />
                  </div>
                ) : (
                  <Component />
                )}
              </TabPane>
            ) : null;
          }
        )}
      </Tabs>
    </>
  );
};

export default Custom;
