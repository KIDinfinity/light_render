import React, { useEffect } from 'react';
import { Tabs, Spin, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import navigator from 'navigator/api';
import Client from './pages/Client';
import { tenant } from '@/components/Tenant';
import type { TabsKey } from './enum';
import { Menus } from './c360.config';
import { ReactComponent as headerIcon } from './Assets/header.svg';
import styles from './index.less';
import ExportButton from './_component/ExportButton';

const { TabPane } = Tabs;

const Custom = ({ caseDetail }: any) => {
  const dispatch = useDispatch();
  const changeId = useSelector(({ insured360 }: any) => insured360?.taskInfo?.changeId) || '';
  const coverageList = useSelector(({ insured360 }: any) => insured360?.coverageList) || [];
  const posHistoryList = useSelector(({ insured360 }: any) => insured360?.posHistoryList) || [];
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
    dispatch({
      type: 'insured360/getCustomerTypeConfig',
      payload: {
        caseDetail,
      },
    });
    return () => {
      dispatch({ type: 'insured360/clearInsured' });
    };
  }, [caseDetail]);

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
        {Menus({ coverageList, posHistoryList, hasComment }).map(
          ({ key, format, component: Component, show, title }: any) => {
            const actualTitle = title || format;
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
                  <div className={styles.contentContainer}>
                    <div className={styles.headerContent}>
                      <div className={styles.title}>
                        <Icon component={headerIcon} />
                        <div>
                          {formatMessageApi({ [`${actualTitle.typeCode}`]: actualTitle.dictCode })}
                        </div>
                      </div>

                      {tenant.isTH() && <ExportButton />}
                    </div>
                    <div className={styles.content}>
                      <Component />
                    </div>
                  </div>
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
